var connection = require('../../Connection/connection').mysql_pool;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function getRegister(body) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password_account, salt);
  let name = body.username_account;
  connection.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('Connected!');
    var sql =
      "INSERT INTO accounts (username_account, password_account) VALUES ('" +
      name +
      "', '" +
      hash +
      "')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log('1 record inserted');
    });
  });
}

exports.getRegister = getRegister;
