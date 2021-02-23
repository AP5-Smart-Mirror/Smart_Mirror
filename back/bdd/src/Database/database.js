const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'smart_mirror_db',
    port: '3308',
  },
});
module.exports = knex;
