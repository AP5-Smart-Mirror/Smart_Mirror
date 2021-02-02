var express = require('express');
var app = express();
var clockRouter = require('./src/Clock/routes/clockRouter');
var googleRouter = require('./src/Google/routes/googleRouter');
var newsRouter = require('./src/News/routes/newsRouter');
var weatherRouter = require('./src/Weather/routes/weatherRouter');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/Swagger/swagger.yaml');
var port = 3000;
require('./src/Outlook/routes/outlookRouter');

app.use('/api/clock', clockRouter);
app.use('/api/google', googleRouter);
app.use('/api/news', newsRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

<<<<<<< HEAD
app.listen(port, function () {
=======
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
app.use('/api/outlook_calendar', function(req,res){
  if (!req.isAuthenticated()) {
    // Redirect unauthenticated requests to home page
    res.redirect('/outlook/auth/signin')
  } else {
    res.redirect('/outlook/calendar');
  }
});

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

app.get('/api/google_calendar', function(req,res){
  google_calendar.getCalendar().then(json => (res.send(json)));
});
 
app.listen(port, function(){
>>>>>>> feature/back_outlook_calendar
  console.log('The API is listening on port ' + port);
});
