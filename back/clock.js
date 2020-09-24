const moment = require("moment");

function jsonClock()
{
    moment.locale();
    var newJson = {};
    newJson['dayname'] = moment().format('dddd');
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
exports.getClock = getClock;
