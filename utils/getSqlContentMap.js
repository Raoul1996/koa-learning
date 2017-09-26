const fs = require('fs')
const getSqlMap = require('./getSqlMap')
let sqlContentMap = {}

/**
 * read the sql file
 * @param {string} fileName
 * @param {string} path
 * @return {string} the data of sql script
 */
function getSqlContent(fileName, path) {
  sqlContentMap[fileName] = fs.readFileSync(path, 'binary')
}

function getSqlContentMap() {
  let sqlMap = getSqlMap()
  for (let key in sqlMap) {
    getSqlContent(key, sqlMap[key])
  }
  return sqlContentMap
}

module.exports = getSqlContentMap