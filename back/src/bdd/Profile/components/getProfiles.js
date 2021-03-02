var db = require('../../Database/database');

async function getProfiles(body) {
  var data = await db
    .select('id', 'username', 'id_account')
    .from('profiles')
    .then((data) => {
      return data;
    });
  return data;
}

exports.getProfiles = getProfiles;
 

