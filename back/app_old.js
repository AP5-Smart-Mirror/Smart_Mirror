ar express = require('express');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
require('dotenv').config();

var passport = require('passport');
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

var app = express();
var users = {};
var port = 3000;

passport.serializeUser(function (user, done) {
  // Use the OID property of the user as a key
  users[user.profile.oid] = user;
  done(null, user.profile.oid);
});

passport.deserializeUser(function (id, done) {
  done(null, users[id]);
});

const oauth2 = require('simple-oauth2').create({
  client: {
    id: process.env.OAUTH_APP_ID,
    secret: process.env.OAUTH_APP_PASSWORD,
  },
  auth: {
    tokenHost: process.env.OAUTH_AUTHORITY,
    authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: process.env.OAUTH_TOKEN_ENDPOINT,
  },
});

async function signInComplete(
  iss,
  sub,
  profile,
  accessToken,
  refreshToken,
  params,
  done
) {
  if (!profile.oid) {
    return done(new Error('No OID found in user profile.'));
  }

  try {
    const user = await graph.getUserDetails(accessToken);
    if (user) {
      // Add properties to profile
      profile['email'] = user.mail ? user.mail : user.userPrincipalName;
    }
  } catch (err) {
    return done(err);
  }
  // Create a simple-oauth2 token from raw tokens
  let oauthToken = oauth2.accessToken.create(params);
  // Save the profile and tokens in user storage
  users[profile.oid] = { profile, oauthToken };
  return done(null, users[profile.oid]);
}

passport.use(
  new OIDCStrategy(
    {
      identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
      clientID: process.env.OAUTH_APP_ID,
      responseType: 'code id_token',
      responseMode: 'form_post',
      redirectUrl: process.env.OAUTH_REDIRECT_URI,
      allowHttpForRedirectUrl: true,
      clientSecret: process.env.OAUTH_APP_PASSWORD,
      validateIssuer: false,
      passReqToCallback: false,
      scope: process.env.OAUTH_SCOPES.split(' '),
    },
    signInComplete
  )
);

var indexRouter = require('./outlook/routes/index');
var usersRouter = require('./outlook/routes/users');
var authRouter = require('./outlook/routes/auth');
var calendarRouter = require('./outlook/routes/calendar');
var graph = require('./outlook/graph');

app.use(
  session({
    secret: 'your_secret_value_here',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
  })
);

app.use(flash());

app.use(function (req, res, next) {
  // Read any flashed errors and save
  // in the response locals
  res.locals.error = req.flash('error_msg');

  // Check for simple error string and
  // convert to layout's expected format
  var errs = req.flash('error');
  for (var i in errs) {
    res.locals.error.push({ message: 'An error occurred', debug: errs[i] });
  }

  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
var moment = require('moment');
// Helper to format date/time sent by Graph
hbs.registerHelper('eventDateTime', function (dateTime) {
  return moment(dateTime).format('M/D/YY h:mm A');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  // Set the authenticated user in the
  // template locals
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});

app.use('/outlook', indexRouter);

app.use('/outlook/auth', authRouter);

app.use('/outlook/calendar', calendarRouter);
app.use('/outlook/users', usersRouter);
