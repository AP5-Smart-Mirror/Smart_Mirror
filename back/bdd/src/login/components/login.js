var connection = require('../../Connection/connection').mysql_pool;

async function getLogin(body) {
  let idProfil = body.idProfil;
  let nom = body.nom;
  let motWEB = body.motWEB;
  connection.getConnection(function (err) {
    if (err) throw err;
    console.log('Connected!');
    var sql =
      "SELECT '" +
      nom +
      "','" +
      motWEB +
      "' from profil where idProfil='" +
      idProfil +
      "'";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log('1 record inserted');
      console.log(result);
    });
  });
}

exports.getLogin = getLogin;
