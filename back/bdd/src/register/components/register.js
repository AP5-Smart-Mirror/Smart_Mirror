var connection = require('../../Connection/connection').mysql_pool;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
async function getRegister(body) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.motWEB, salt);
  let nom = body.nom;
  connection.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('Connected!');
    var sql =
      "INSERT INTO profil (nom, motWEB) VALUES ('" + nom + "', '" + hash + "')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log('1 record inserted');
    });
  });
}

exports.getRegister = getRegister;
