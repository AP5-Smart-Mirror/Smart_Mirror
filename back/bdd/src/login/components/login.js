var connection = require('../../Connection/connection').mysql_pool;
const bcrypt = require('bcryptjs');

function getLogin(body) {
  var id = {};
  let name = body.username_account;
  let password = body.password_account;
  connection.getConnection(function (err) {
    if (err) throw err;
    console.log('Connected!');
    var sql =
      "SELECT id_account,username_account,password_account from accounts where username_account='" +
      name +
      "'";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0]);
      let isEqual = bcrypt.compareSync(password, result[0].password);
      if (isEqual === true) {
        id['id'] = result[0].idProfil;
      }
    });
  });
}

exports.getLogin = getLogin;
