var db = require('../../Database/database');

async function setUserWidgets(body) {
  var result = {};
  var profile = body.id_profile;
  var widgets = body.widgets;
  await db('associative').where({ id_profile: profile }).del();
  widgets.forEach(async (widget) => {
    var data = await db
      .select('id')
      .from('widgets')
      .where('widget', widget.widget);
    await db
      .insert({ id_profile: profile, id_widget: data[0].id })
      .from('associative');
  });
  result['msg'] = 'done';
  return result;
}

exports.setUserWidgets = setUserWidgets;
