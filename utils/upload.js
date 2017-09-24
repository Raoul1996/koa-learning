const path = require('path')
const inspect = require('util').inspect
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param {string} dirName 目录绝对地址
 * @return {boolean} 创建目录的结果
 */
function mkdirSync(dirName) {
  if (fs.existsSync(dirName)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirName))) {
      fs.mkdirSync(dirName)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param {string} fileName 待获取后缀名的文件名
 * @return {string} 文件的后缀名
 */
function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

function uploadFile(ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})
  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirRes = mkdirSync(filePath)
  return new Promise((resolve, reject) => {
    console.log('uploading.......')
    let result = {
      success: false,
      formData: {},
      message: ''
    }
    // analysis the request file event
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      // rename the file. from filename to fileName.
      let fileName = `${Math.random().toString(16).substr(2)}.${getSuffixName(filename)}`
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)
      // save file to the appoint path
      file.pipe(fs.createWriteStream(saveTo))
      // the end of write event
      file.on('end', function () {
        result.success = true
        result.message = 'uploading file successful'
        console.log('uploading file successful')
        resolve(result)
      })
    })
    // analysis the field data in the table
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log(`the table field data [${fieldname}] : value : ${inspect(val)}`)
      result.formData[fieldname] = inspect(val)
    })
    // analysis the end event
    busboy.on('finish', function () {
      console.log('upload file finish')
    })
    // analysis the error event
    busboy.on('error', function (err) {
      console.log('upload file failed')
      reject(result)
    })
    req.pipe(busboy)
  })
}

module.exports = {
  uploadFile
}