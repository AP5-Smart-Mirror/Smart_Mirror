const express = require('express');
const app = express();
const clockRouter = require('./src/Clock/routes/clockRouter');
const googleRouter = require('./src/Google/routes/googleRouter');
const newsRouter = require('./src/News/routes/newsRouter');
const weatherRouter = require('./src/Weather/routes/weatherRouter');
const indexRouter = require('./src/Outlook/routes/index');
const usersRouter = require('./src/Outlook/routes/users');
const authRouter = require('./src/Outlook/routes/auth');
const calendarRouter = require('./src/Outlook/routes/calendar');
const graph = require('./src/Outlook/graph');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/Swagger/swagger.yaml');
const port = 3000;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    next();
});
app.use('/api/clock', clockRouter);
app.use('/api/google', googleRouter);
app.use('/api/news', newsRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

const users = {};

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
  res.locals.error = req.flash('error_msg');
  var errs = req.flash('error');
  for (var i in errs) {
    res.locals.error.push({ message: 'An error occurred', debug: errs[i] });
  }
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});

app.use('/api/outlook', indexRouter);

app.use('/api/outlook/auth', authRouter);

app.use('/api/outlook/calendar', calendarRouter);
app.use('/api/outlook/users', usersRouter);



app.listen(port, function () {
  console.log('The API is listening on port ' + port);
});
