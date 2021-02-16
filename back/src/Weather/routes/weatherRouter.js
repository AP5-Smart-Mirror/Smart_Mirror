var express = require('express');
var weather = require('../components/weather.js');
var weatherForecast = require('../components/weather_forecast.js');
var router = express.Router();

/* GET auth callback. */
router.get('/current', function (req, res, next) {
  weather.getWeather().then((json) => res.send(json));
});

router.get('/forecast', function (req, res, next) {
  weatherForecast.getWeather().then((json) => res.send(json));
});

module.exports = router;
