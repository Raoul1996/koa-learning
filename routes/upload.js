const router = require('koa-router')()
const path = require('path')
const {uploadFile} = require('../utils/upload')
router.prefix('/upload')
router.get('/sync', async (ctx, next) => {
  await ctx.render('upload', {
    title: 'Koa2 upload-sync'
  })
})
router.post('/upload.json', async (ctx, next) => {
  {
    let result = {success: false}
    let serverFilePath = path.join(__dirname, 'public/upload-files')

    // upload file event
    result = await uploadFile(ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })
    ctx.body = result
  }
})
router.get('/async', async (ctx, next) => {
  await ctx.render('upload-async', {
    title: 'Koa2 upload-async'
  })
})


module.exports = router