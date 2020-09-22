var fetch = require('node-fetch');
var apiKey = 'c0735eb48963d2eea782623d14502b53';
var city = 'Lille';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

function jsonTreatment(json){
    var newJson = {};
    newJson['currenttemp'] = json['main']['temp'];
    newJson['city'] = city;
    newJson['iconurl'] = 'http://openweathermap.org/img/wn/'+ json['weather'][0]['icon'] +'.png'
    return newJson
}

async function getWeatherProm() {
    return new Promise((success,failure) => {
        fetch(url,
            {
                headers:{
                    'Accept':'application/json'
                }
            })           
            .then(response => {
                success(response.json()); 
            })
    })
};

async function getWeather() {
    return jsonTreatment(await getWeatherProm());
}


exports.getWeather = getWeather;