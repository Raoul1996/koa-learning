const router = require('koa-router')()
const path = require('path')
const {uploadFile} = require('../utils/upload')
router.prefix('/api')
router.post('/async/upload.json', async (ctx, next) => {
  let result = {success: false}
  let serverFilePath = path.join(__dirname, '../public/upload-files')
  // upload file event
  result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})
router.post('/sync/upload.json', async (ctx, next) => {
  {
    let result = {success: false}
    // the path is based on the route path.I want to save the file to the ../public
    let serverFilePath = path.join(__dirname, '../public/upload-files')
    // upload file event
    result = await uploadFile(ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })
    ctx.body = result
  }
})
module.exports = router