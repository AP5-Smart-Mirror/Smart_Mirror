var connection = require('../../Connection/connection').mysql_pool;

async function getLogin(body) {
  let nom = body.nom;
  let motWEB = body.motWEB;
  connection.getConnection(function (err) {
    if (err) throw err;
    console.log('Connected!');
    var sql =
      "INSERT INTO profil (nom, motWEB) VALUES ('" +
      nom +
      "', '" +
      motWEB +
      "')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log('1 record inserted');
    });
  });
}

exports.getLogin = getLogin;
