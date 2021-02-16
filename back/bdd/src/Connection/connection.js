var mysql= require('mysql');
var port = '3308';
var config;
config = {
    mysql_pool : mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mydb',
        port: port,
    })
};
module.exports = config;