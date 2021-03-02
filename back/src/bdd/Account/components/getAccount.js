var db = require('../../Database/database');
const bcrypt = require('bcryptjs');

async function getAccount(body) {
  var result = {};
  let id = body.id_account;
  var data = await db.select('id', 'username').from('accounts').where('id', id);
  result['id'] = data[0].id;
  result['username'] = data[0].username;

  return result;
}

exports.getAccount = getAccount;
