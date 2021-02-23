var mysql = require('mysql');
var port = '3308';
var config;
config = {
  mysql_pool: mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_mirror_db',
    port: port,
  }),
};
module.exports = config;
