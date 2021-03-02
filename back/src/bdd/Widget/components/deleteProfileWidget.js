var db = require('../../Database/database');

async function deleteUserWidget(body) {
  result = {};
  let profile = body.id_profile;
  let widget = body.id_widget;
  var res = await db('associative')
    .where({ id_profile: profile, id_widget: widget })
    .del();
  if (res != 0) {
    result['msg'] = 'Successfully deleted';
  } else {
    result['msg'] = 'Nothing to delete';
  }
  return result;
}

exports.deleteUserWidget = deleteUserWidget;
