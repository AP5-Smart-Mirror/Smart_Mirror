var db = require('../../Database/database');

async function getUserWidgets(body) {
  var result = {};
  let id = body.id_profile;
  result['widgets'] = await db('profiles')
    .join('associative', 'profiles.id', '=', 'associative.id_profile')
    .join('widgets', 'widgets.id', '=', 'associative.id_widget')
    .select('widgets.id', 'widgets.widget')
    .where('associative.id_profile', id);

  return result;
}

exports.getUserWidgets = getUserWidgets;
