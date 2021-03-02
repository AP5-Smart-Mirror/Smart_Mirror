var db = require('../../Database/database');

async function getWidgets(body) {
  var data = await db
    .select('id', 'widget')
    .from('widgets')
    .then((data) => {
      return data;
    });
  return data;
}

exports.getWidgets = getWidgets;
 

