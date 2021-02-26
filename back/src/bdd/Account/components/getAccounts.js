var db = require('../../Database/database');
const bcrypt = require('bcryptjs');

async function getAccounts(body) {
  var data = await db
    .select('id', 'username', 'password')
    .from('accounts')
    .then((data) => {
      return data;
    });
  return data;
}

exports.getAccounts = getAccounts;
 

