var fetch = require('node-fetch');                //load the module node-fetch
var apiKey = 'c0735eb48963d2eea782623d14502b53';  //personal key to get weather data 
var city = 'Lille';                               //city name to specify the weather data
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;   //url using previous variables

function jsonTreatment(json){
    var newJson = {};                                 //make a new json variable
    newJson['currenttemp'] = json['main']['temp'];    //recuperation of temperature
    newJson['city'] = city;                           
    newJson['iconurl'] = 'http://openweathermap.org/img/wn/'+ json['weather'][0]['icon'] +'.png'
    return newJson
}

function getWeatherProm() {
    return new Promise((success,failure) => {       //declaration of promise
        fetch(url,                                  //url indication
            {
                headers:{
                    'Accept':'application/json'     //want json
                }
            })           
            .then(response => {                     //display the response in json
                success(response.json()); 
            })
            .catch(err => console.error(err));      //display the error in console
 
    })
};

async function getWeather() {
    return jsonTreatment(await getWeatherProm());   //return value of jsonTreatment which use the returned value of getWeatherProm
}

exports.getWeather = getWeather;               //export function getWeather