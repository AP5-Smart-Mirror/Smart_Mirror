var db = require('../../Database/database');
const bcrypt = require('bcryptjs');

async function getLogin(body) {
  var result = {};
  let name = body.username;
  let password = body.password;
  var data = await db
    .select('id', 'username')
    .from('accounts')
    .where('username', name);
  result['id'] = data[0].id;

  var listProfiles = await db
    .select('id', 'username')
    .from('profiles')
    .where('id_account', data[0].id);

  result['profiles'] = listProfiles;

  return result;
}

exports.getLogin = getLogin;
