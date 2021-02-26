var db = require('../../Database/database');

async function getAdd(body) {
  let widget = body.widget;
  var data = await db
    .insert({ widget: widget })
    .from('widgets')
    .then((data) => {
      return data;
    });
  return data;
}

exports.getAdd = getAdd;
