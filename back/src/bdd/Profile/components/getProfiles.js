var db = require('../../Database/database');

async function getProfiles(body) {
  var result = {};
  var data = await db
    .select('id', 'username', 'password')
    .from('accounts')

  result['id'] = data[0].id;
  result['profiles'] = await db
    .select('id', 'username')
    .from('profiles')
    .where('id_account', data[0].id);

  return result;
}

exports.getProfiles = getProfiles;