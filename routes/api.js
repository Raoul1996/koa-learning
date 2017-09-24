const router = require('koa-router')()
const path = require('path')
const {uploadFile} = require('../utils/upload')
router.prefix('/api')
router.post('/picture/upload.json', async (ctx, next) => {
  let result = {success: false}
  let serverFilePath = path.join(__dirname, '/public/image')
  // upload file event
  result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})