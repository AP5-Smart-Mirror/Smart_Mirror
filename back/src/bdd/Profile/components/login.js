var db = require('../../Database/database');

async function getLogin(body) {
  let name = body.username;
  var data = await db
    .select('id', 'username')
    .from('profiles')
    .where('username', name)
    .then((data) => {
      return data;
    });
  return data;
}

exports.getLogin = getLogin;
