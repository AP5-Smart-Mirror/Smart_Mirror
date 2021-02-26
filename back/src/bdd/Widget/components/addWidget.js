var db = require('../../Database/database');

async function getAdd(body) {
  var result = {};
  let widget = body.widget;
  var res = await db.insert({ widget: widget }).from('widgets');
  if (res != 0) {
    result['id'] = res[0];
    result['msg'] = 'Successfully created';
  } else {
    result['msg'] = 'Nothing was created';
  }
  return result;
}

exports.getAdd = getAdd;
