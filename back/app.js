var express = require('express');
var weather = require('./weather.js');

var app = express();

var port = 3000;

app.get('/', function(req, res) {
    var message = "Welcome to the Smart Mirror API!"
    res.send(message);
});

app.get('/api/weather/get', function(req,res){
    weather.getWeather().then(json => (res.send(json)));
});

app.listen(port, function(){
    console.log('The API is listening on port ' + port);
});