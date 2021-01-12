var express = require('express');
var weather = require('./weather.js')
var weatherForecast = require('./weather_forecast.js');
var clock = require('./clock.js');
var news = require('./news.js');
var google_calendar = require('./google_calendar.js');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

passport.serializeUser(function(user, done) {
  // Use the OID property of the user as a key
  users[user.profile.oid] = user;
  done (null, user.profile.oid);
});

passport.deserializeUser(function(id, done) {
  done(null, users[id]);
});

const oauth2 = require('simple-oauth2').create({
  client: {
    id: process.env.OAUTH_APP_ID,
    secret: process.env.OAUTH_APP_PASSWORD
  },
  auth: {
    tokenHost: process.env.OAUTH_AUTHORITY,
    authorizePath: process.env.OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: process.env.OAUTH_TOKEN_ENDPOINT
  }
});

async function signInComplete(iss, sub, profile, accessToken, refreshToken, params, done) {
  if (!profile.oid) {
    return done(new Error("No OID found in user profile."));
  }

  try{
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

passport.use(new OIDCStrategy(
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
    scope: process.env.OAUTH_SCOPES.split(' ')
  },
  signInComplete
));

var indexRouter = require('./outlook/routes/index');
var usersRouter = require('./outlook/routes/users');
var authRouter = require('./outlook/routes/auth');
var calendarRouter = require('./outlook/routes/calendar');
var emailRouter = require('./outlook/routes/email');
var graph = require('./outlook/graph');

app.use(session({
  secret: 'your_secret_value_here',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

app.use(flash());

app.use(function(req, res, next) {
  // Read any flashed errors and save
  // in the response locals
  res.locals.error = req.flash('error_msg');

  // Check for simple error string and
  // convert to layout's expected format
  var errs = req.flash('error');
  for (var i in errs){
    res.locals.error.push({message: 'An error occurred', debug: errs[i]});
  }

  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
var moment = require('moment');
// Helper to format date/time sent by Graph
hbs.registerHelper('eventDateTime', function(dateTime){
  return moment(dateTime).format('M/D/YY h:mm A');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // Set the authenticated user in the
  // template locals
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Smart Mirror API",
        description: "This API is used be our Smart Mirror to get all the data necessaries to display",
        contact: {
          name: "Amazing Developers"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis: ["app.js"]
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
 
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

/**
 * @swagger
 * /:
 *  get:
 *    description: Use it to see the best welcome message!
 *    responses:
 *      '200':
 *        description: a single string is returned
 */
app.get('/', function(req, res) {
  var message = "Welcome to the Smart Mirror API!"
  res.send(message);
});

// Routes
/**
 * @swagger
 * /api/clock:
 *  get:
 *    description: Use to get the current date and time
 *    responses:
 *      '200':
 *        description: a json is returned
 *        schema:
 *         $ref: '#/definitions/Clock'
 *      '400':
 *        description: "Invalid status value"
 */
app.get('/api/clock', function(req,res){
  res.send(clock.getClock());
});

/**
 * @swagger
 * /api/weather:
 *  get:
 *    description: Use to get the current weather from openweathermap
 *    responses:
 *      '200':
 *        description: a json is returned
 *        schema:
 *         $ref: '#/definitions/Weather'
 *      '400':
 *        description: "Invalid status value"
 */
app.get('/api/weather', function(req,res){
    weather.getWeather().then(json => (res.send(json)));
});


/**
 * @swagger
 * /api/weather_forecast:
 *  get:
 *    description: Use to get the current and the hourly weather from openweathermap
 *    responses:
 *      '200':
 *        description: a json is returned
 *        schema:
 *         $ref: '#/definitions/WeatherForecast'
 *      '400':
 *        description: "Invalid status value"
 */
app.get('/api/weather_forecast', function(req,res){
  weatherForecast.getWeather().then(json => (res.send(json)));
});

/**
 * @swagger
 * /api/news:
 *  get:
 *    description: Use to get the last newstitle from newsapi
 *    responses:
 *      '200':
 *        description: a json is returned
 *        schema:
 *         $ref: '#/definitions/News'
 *      '400':
 *        description: "Invalid status value"
 */
app.get('/api/news', function(req,res){
  news.getNews().then(json => (res.send(json)));
});

/**
 * @swagger
 * /outlook:
 *  get:
 *    description: Use to connect on an outlook account
 *    responses:
 *      '200':
 *        description: a simple link is displayed to redirect on a microsoft connection page
 *      '400':
 *        description: "Invalid status value"
 */
app.use('/outlook', indexRouter);

/**
 * @swagger
 * /outlook/auth:
 *  get:
 *    description: Use to connect on an outlook account
 *    responses:
 *      '200':
 *        description: allow to avoid the step with the link and then redirect on /outlook
 *      '400':
 *        description: "Invalid status value"
 */
app.use('/outlook/auth', authRouter);

/**
 * @swagger
 * /outlook/calendar:
 *  get:
 *    description: Use to get the events on an outlook account
 *    responses:
 *      '200':
 *        description: a json is returned
 *        schema:
 *         $ref: '#/definitions/Outlook_calendar'
 *      '400':
 *        description: "Invalid status value"
 */
app.use('/outlook/calendar', calendarRouter);
app.use('/outlook/users', usersRouter);

app.use('/outlook/messages', emailRouter);

app.get('/api/google_calendar', function(req,res){
  google_calendar.getCalendar().then(json => (res.send(json)));
});
 
app.listen(port, function(){
  console.log('The API is listening on port ' + port);
});


/**
 * @swagger
 *
 * definitions:
 *   Clock:
 *    type: object
 *    properties:
 *     dayname:
 *      type: string
 *      example: "Lundi"
 *     monthname:
 *      type: string
 *      example: "Mars"
 *     day:
 *      type: integer
 *      example: 28
 *     year:
 *      type: integer
 *      example: 2020
 *     hours:
 *      type: integer
 *      example: 14
 *     minutes:
 *      type: integer
 *      example: 58
 *     seconds:
 *      type: integer
 *      example: 34
 *   Weather:
 *    type: object
 *    properties:
 *     currenttemp:
 *      type: integer
 *      example: 19
 *     city:
 *      type: string
 *      example: "Lille"
 *     iconurl:
 *      type: string
 *      example: "http://openweathermap.org/img/w/10d.png"
 *   WeatherForecast:
 *    type: object
 *    properties:
 *     city:
 *      type: string
 *      example: "Lille"
 *     current:
 *       temp:
 *        type: double
 *       sunrise: 
 *        type: integer
 *       sunset:
 *        type: integer
 *       example: {"temp":14.59,"sunrise": 1603347747,"sunset": 1603384896,"description":"légère pluie","iconurl":"http://openweathermap.org/img/wn/10d.png"}
 *     hourly:
 *      example: 
 *       $ref: '#/definitions/ArrayOfHourly'
 *     daily:
 *      example:
 *       $ref: '#/definitions/ArrayOfDaily' 
 *   ArrayOfHourly:
 *    id:
 *      $ref: '#/definitions/Hourly'
 *   ArrayOfDaily:
 *    id:
 *      $ref: '#/definitions/Daily'
 *   Hourly:
 *    dt: 1601982000
 *    temp: 14.59
 *    description: "légère pluie"
 *    iconurl: "http://openweathermap.org/img/wn/10d.png"
 *   Daily:
 *    dt: 1603537200
 *    temp: 14.46
 *    description: "légère pluie"
 *    iconurl: "http://openweathermap.org/img/wn/10d.png"
 *   News:
 *    type: object
 *    properties:
 *     news:
 *      example: 
 *       $ref: '#/definitions/ArrayOfNews'
 *   ArrayOfNews:
 *    0:
 *      type: array
 *      $ref: '#/definitions/NewsItem'
 *    1:
 *      type: array
 *      $ref: '#/definitions/NewsItem2'
 *   NewsItem:
 *    source: "Francetvinfo.fr"
 *    title: "Miss France 2021 : à peine élue, Anastasia Salvi, Miss Franche-Comté annonce sur Instagram renoncer à son titr - France 3 Régions"
 *   NewsItem2:
 *    source: "L'equipe"
 *    title: "Équipe de France : Olivier Giroud titulaire contre l'Ukraine - Foot - Bleus - L'Équipe.fr"
 *   Outlook_calendar:
 *    type: array
 *    items:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          "@odata.etag": 
 *              type: string
 *              example : "W/\"WlmYJULeyEiDlUMJkEu+vAAAA63umQ==\""
 *          "id": 
 *            type: string
 *            example: "AQMkADAwATY3ZmYAZS0xMGNiLWIxNjAtMDACLTAwCgBGAAADK92D3t4AbLZFmxY1izhjHhsHAFpZmCVC3shIg5VDCZBLvrwAAAIBDQAAAFpZmCVC3shIg5VDCZBLvrwAAAADrzeYAAAA"
 *          "subject": 
 *             type: string
 *             example: "coucou le mirroir"
 *          "start": 
 *             type: object
 *             example: {"dateTime": "2020-11-03T16:00:00.0000000","timeZone": "UTC"}
 *          "end":  
 *             type: object
 *             example: {"dateTime": "2020-11-03T16:30:00.0000000","timeZone": "UTC"}
 *          "organizer":  
 *             type: object
 *             example: {"emailAddress": {"name": "Adrien La Rafale","address": "Mirroir-Connecte@hotmail.com"}}
 */