// event_db.js
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'lwang71_admin',
  password: 'Wlz@040901',   // <- 如果你的 root 密码不同，改成你的密码
  database: 'lwang71_MySQL666'  // <- 你之前使用的数据库名
});

module.exports = pool;
