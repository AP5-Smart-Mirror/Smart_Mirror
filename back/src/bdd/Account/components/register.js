var db = require('../../Database/database');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function getRegister(body) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);
  let username = body.username;
  await db('accounts')
    .insert({ username: username, password: hash })
    .then((data) => {
      console.log('1 record inserted');
    });
}

exports.getRegister = getRegister;
