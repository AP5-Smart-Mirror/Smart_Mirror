var express = require('express');
var weather = require('./weather.js')
var weatherForecast = require('./weather_forecast.js');
var clock = require('./clock.js');
var news = require('./news.js');
var google_calendar = require('./google_calendar.js');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
 
var app = express();
 
var port = 3000;

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
 *       example: {"temp":14.59,"description":"légère pluie","iconurl":"http://openweathermap.org/img/wn/10d.png"}
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
 */