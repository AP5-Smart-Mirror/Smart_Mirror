var db = require('../../Database/database');
const bcrypt = require('bcryptjs');

async function getAll(body) {
  var result = {};
  let name = body.username;
  let password = body.password;
  var data = await db
    .select('id', 'username', 'password')
    .from('accounts')
    .where('username', name);

  if (bcrypt.compareSync(password, data[0].password)) {
    result['id'] = data[0].id;
    result['username'] = data[0].username;
    var profiles = [];
    var profilesDB = await db
      .select('id', 'username')
      .from('profiles')
      .where('id_account', data[0].id);
    await profilesDB.forEach(async (profile) => {
      var newProfile = {};
      newProfile['id'] = profile.id;
      newProfile['username'] = profile.username;
      newProfile['widgets'] = await db('profiles')
        .join('associative', 'profiles.id', '=', 'associative.id_profile')
        .join('widgets', 'widgets.id', '=', 'associative.id_widget')
        .select('widgets.id', 'widgets.widget')
        .where('associative.id_profile', profile.id);
      console.log(newProfile);
    });
    console.log(profiles);
    result['profiles'] = profiles;
  } else {
    result['id'] = -1;
  }

  return result;
}

exports.getAll = getAll;
