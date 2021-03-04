var db = require('../../Database/database');
const bcrypt = require('bcryptjs');

async function getAll(body) {
  var result = {};
  let name = body.username;
  let password = body.password;
  var data = await db
    .select('id', 'username', 'password')
    .from('accounts')
    .limit(1);

  result['id'] = data[0].id;
  result['username'] = data[0].username;
  var profiles = [];
  var profilesDB = await db
    .select('id', 'username')
    .from('profiles')
    .where('id_account', 1);
  console.log('SIZE', profilesDB.length);
  for (var i = 0; i < profilesDB.length; i++) {
    var newProfile = {};
    newProfile['id'] = profilesDB[i].id;
    newProfile['username'] = profilesDB[i].username;
    newProfile['widgets'] = await db('profiles')
      .join('associative', 'profiles.id', '=', 'associative.id_profile')
      .join('widgets', 'widgets.id', '=', 'associative.id_widget')
      .select('widgets.id', 'widgets.widget')
      .where('associative.id_profile', profilesDB[i].id);
    profiles.push(newProfile);
  }
  console.log(profiles);
  result['profiles'] = profiles;

  return result;
}

exports.getAll = getAll;
