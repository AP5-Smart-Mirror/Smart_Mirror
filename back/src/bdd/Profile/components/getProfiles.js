var db = require('../../Database/database');

async function getProfiles(body) {
  var result = {};
  let id = body.id_account;
  result['profiles'] = await db
    .select('id', 'username')
    .from('profiles')
    .where('id_account', id);

  return result;
}

exports.getProfiles = getProfiles;
