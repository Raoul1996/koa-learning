const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'p;r)t>Tba8gw',
  database: 'my_database'
})
connection.query('SELECT * FORM my_table', (error, result, fields) => {
  if (error) {
    throw error
  }
  //connected!

  // close session
  connection.release()
})