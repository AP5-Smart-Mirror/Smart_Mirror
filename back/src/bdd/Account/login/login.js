var db = require('../../Database/database');
const bcrypt = require('bcryptjs');

async function getLogin(body) {
  var id = {};
  let name = body.username;
  let password = body.password;
  var data = await db
    .select('id', 'username')
    .from('accounts')
    .where('username', name)
    .then((data) => {
      return data;
    });
  return data;
}

exports.getLogin = getLogin;
