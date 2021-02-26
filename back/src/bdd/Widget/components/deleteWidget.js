var db = require('../../Database/database');

async function getDelete(body) {
  result = {};
  let id = body.id;
  var res = await db('widgets').where({ id: id }).del();
  if (res != 0) {
    result['msg'] = 'Successfully deleted';
  } else {
    result['msg'] = 'Nothing to delete';
  }
  return result;
}

exports.getDelete = getDelete;
