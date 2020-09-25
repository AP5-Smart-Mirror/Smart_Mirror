const moment = require("moment");
moment.locale('fr');

function jsonClock()
{
    moment.locale();
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

exports.getClock = getClock;
