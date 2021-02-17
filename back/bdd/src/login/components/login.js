var connection = require('../../Connection/connection').mysql_pool;
const bcrypt = require('bcryptjs');

function getLogin(body) {
  var id = {};
  let nom = body.nom;
  let motWEB = body.motWEB;
  connection.getConnection(function (err) {
    if (err) throw err;
    console.log('Connected!');
    var sql = "SELECT idProfil,nom,motWEB from profil where nom='" + nom + "'";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0]);
      let isEqual = bcrypt.compareSync(motWEB, result[0].motWEB);
      if (isEqual === true) {
        id['id'] = result[0].idProfil;
      }
    });
  });
}

exports.getLogin = getLogin;
