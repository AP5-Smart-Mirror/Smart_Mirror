var db = require('../../Database/database');

async function getProfile(body) {
  var result = {};
  let id = body.id;
  var data = await db.select('id', 'username').from('profiles').where('id', id);

  result['id'] = data[0].id;
  result['username'] = data[0].username;

  return result;
}

exports.getProfile = getProfile;
