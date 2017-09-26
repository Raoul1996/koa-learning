const mysql = require('mysql')
const {poolConfig} = require('../config')
const pool = mysql.createPool({
  host: poolConfig.host,
  port: poolConfig.port,
  user: poolConfig.user,
  password: poolConfig.password,
  database: poolConfig.database
})
let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
module.exports = {query}