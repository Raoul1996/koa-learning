const fs = require('fs')

/**
 * 遍历文件夹
 * @param pathResolve 需要遍历的目录路径
 * @param mime 遍历文件的后缀名
 * @return {{}} 返回遍历后的目录结果
 */
const walkFile = function (pathResolve, mime) {
  let files = fs.readdirSync(pathResolve)
  let fileList = {}
  for (let [i, item] of files.entries()) {
    console.log(item)
    let itemArr = item.split('\.')
    let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : 'undefined'
    let keyName = item + ''
    if (mime === itemMime) {
      fileList[item] = pathResolve + keyName
    }
  }
  return fileList
}
module.exports = walkFile