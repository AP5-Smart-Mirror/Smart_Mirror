var db = require('../../Database/database');
const bcrypt = require('bcryptjs');

async function getLogin(body) {
  var result = {};
  let name = body.username;
  let password = body.password;
  var data = await db
    .select('id', 'username', 'password')
    .from('accounts')
    .where('username', name);

  if (bcrypt.compareSync(password, data[0].password)) {
    result['id'] = data[0].id;
    result['profiles'] = await db
      .select('id', 'username')
      .from('profiles')
      .where('id_account', data[0].id);
  } else {
    result['id'] = -1;
  }

  return result;
}

exports.getLogin = getLogin;
