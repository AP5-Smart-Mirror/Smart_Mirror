const moment = require("moment");  //use librairy moment
moment.locale('fr');   //localisation date in French

function jsonClock()
{
    var newJson = {};
    newJson['dayname'] = moment().format('dddd');  //recuperation of dayname format 
    newJson['monthname'] = moment().format('MMMM');  
    newJson['day'] = moment().format('Do');        
    newJson['year'] = moment().format('YYYY');
    newJson['hours'] = moment().format('h'); 
    newJson['minutes'] = moment().format('mm');
    newJson['secondes'] = moment().format('ss');
    return newJson

}

function getClock()
{
    return jsonClock();

}

console.log(getClock());
exports.getClock = getClock;                      //export function getClock
