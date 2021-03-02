var db = require('../../Database/database');

async function getList() {
  var result = {};
  var data = await db.select('id', 'widget').from('widgets');
  result['widgets'] = data;
  return result;
}

exports.getList = getList;
