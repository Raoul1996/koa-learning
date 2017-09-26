const fs = require('fs')
const walkFile = require('./walkFile')

/**
 * get sql path file data
 * @return {{}}
 */
function getSqlMap() {
  let basePath = __dirname
  basePath = basePath.replace(/\\/g, '\/')
  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice(0, pathArr.length - 1)
  basePath = pathArr.join('/') + '/sql/'
  console.log(walkFile(basePath, 'sql'))
  return walkFile(basePath, 'sql')
}

module.exports = getSqlMap