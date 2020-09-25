const moment = require("moment");  //use librairy moment
moment.locale('fr');   //localisation date in French

function jsonClock()
{
    var newJson = {};
    newJson['dayname'] = moment().format('dddd');
    newJson['monthname'] = moment().format('MMMM'); 
    newJson['day'] = parseInt(moment().format('Do'));
    newJson['year'] = parseInt(moment().format('YYYY'));
    newJson['hours'] = parseInt(moment().format('h')); 
    newJson['minutes'] = parseInt(moment().format('mm'));
    newJson['seconds'] = parseInt(moment().format('ss'));
    return newJson

}

function getClock()
{
    return jsonClock();
}

exports.getClock = getClock;                      //export function getClock
