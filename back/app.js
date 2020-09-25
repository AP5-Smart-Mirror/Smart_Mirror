var express = require('express');
var weather = require('./weather.js');
var clock = require('./clock.js');
 
var app = express();
 
var port = 3000;
 
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});
 
app.get('/', function(req, res) {
    var message = "Welcome to the Smart Mirror API!"
    res.send(message);
});
 
app.get('/api/clock', function(req,res){
    res.send(clock.getClock());
});
 
app.get('/api/weather', function(req,res){
    weather.getWeather().then(json => (res.send(json)));
});
 
app.get('/api/news', function(req,res){
});
 
app.listen(port, function(){
    console.log('The API is listening on port ' + port);
});