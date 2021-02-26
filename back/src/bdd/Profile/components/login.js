var db = require('../../Database/database');

async function getLogin(body) {
  var result = {};
  let name = body.username;
  var data = await db
    .select('id', 'username')
    .from('profiles')
    .where('username', name);
  result['id'] = data[0].id;
  result['widgets'] = await db('profiles')
    .join('associative', 'profiles.id', '=', 'associative.id_profile')
    .join('widgets', 'widgets.id', '=', 'associative.id_widget')
    .select('widgets.id', 'widgets.widget')
    .where('associative.id_profile', data[0].id);

  return result;
}

exports.getLogin = getLogin;
