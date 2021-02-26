var db = require('../../Database/database');

async function getDelete(body) {
  let id = body.id;
  var data = await db('widgets').where({ id: id }).del();
  return data;
}

exports.getDelete = getDelete;
