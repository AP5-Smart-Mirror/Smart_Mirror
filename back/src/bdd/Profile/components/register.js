var db = require('../../Database/database');

async function getRegister(body) {
  let name = body.username;
  let account = body.id_account;
  await db('profiles')
    .insert({ username: name, id_account: account })
    .then((data) => {
      console.log('1 record inserted');
    });
}

exports.getRegister = getRegister;
