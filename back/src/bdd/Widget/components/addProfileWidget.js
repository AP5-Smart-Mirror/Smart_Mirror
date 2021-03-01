var db = require('../../Database/database');

async function addUserWidget(body) {
  var result = {};
  var profile = body.id_profile;
  var widget = body.id_widget;
  var res = await db
    .insert({ id_profile: profile, id_widget: widget })
    .from('associative');
  if (res == 0) {
    result['msg'] = 'Successfully created';
  }
  return result;
}

exports.addUserWidget = addUserWidget;
