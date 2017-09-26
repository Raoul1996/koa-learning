const mysql = require('mysql')
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'p;r)t>Tba8gw',
  database: 'my_database'
})
pool.getConnection(function (err, connection) {
  connection.query('SELECT * FROM my_table', (error, result, fields) => {
    if (error) {
      throw error
    }

    connection.release()
  })
})