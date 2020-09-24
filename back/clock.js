function jsonClock()
{
    var now = new Date();
    var newJson = {};
    newJson['dayname'] = now.getDay();
    newJson['monthname'] = now.getMonth(); 
    newJson['day'] = now.getDate();
    newJson['year'] = now.getFullYear();
    newJson['hours'] = now.getHours(); 
    newJson['minutes'] = now.getMinutes();
    newJson['secondes'] = now.getSeconds();
    return newJson

}

function getClock()
{
    return jsonClock();

}

console.log(getClock());
exports.getClock = getClock;
