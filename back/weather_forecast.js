var fetch = require('node-fetch');                //load the module node-fetch
var APIkey = 'c0735eb48963d2eea782623d14502b53';  //personal key to get weather data 
var city = 'Lille Nord France';                   //city name to specify the weather data
var nodeGeocoder = require('node-geocoder');
var options = {
      provider: 'openstreetmap'
    };
var geoCoder = nodeGeocoder(options);

function jsonTreatment(json,geo){
    var newJson = {};
    newJson['city'] = geo[0]["city"];
    var newCurrent = {}                                 //make a new json variable
    newCurrent['temp'] = json['current']['temp'];    //recuperation of temperature
    newCurrent['description'] = json["current"]['weather'][0]['description'],                  
    newCurrent['iconurl'] = 'http://openweathermap.org/img/wn/'+ json["current"]['weather'][0]['icon'] +'.png'
    newJson['current'] = newCurrent;

    var newHourly = [];

    for(var i = 0; i < json["hourly"].length; i++) {
        var hourly = {};
        hourly['dt'] = json["hourly"][i]['dt'];
        hourly['temp'] = json["hourly"][i]['temp'];
        hourly['description'] = json["hourly"][i]['weather'][0]['description'],  
        hourly['iconurl'] = 'http://openweathermap.org/img/wn/'+ json["hourly"][i]['weather'][0]['icon'] +'.png'
        newHourly.push(hourly);
    }
    newJson['hourly'] = newHourly;
    return newJson
}

function getWeatherProm(url) {
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
    let geo = await geoCoder.geocode(city)
                                    .then((res)=> {
                                        return res;
                                    })
                                    .catch((err)=> {
                                        console.log(err);
                                    });    
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${geo[0]['latitude']}&lon=${geo[0]['longitude']}&units=metric&lang=fr&exclude=minutely&appid=${APIkey}`;
    return jsonTreatment(await getWeatherProm(url),geo);   //return value of jsonTreatment which use the returned value of getWeatherProm
}

exports.getWeather = getWeather;             //export function getWeather