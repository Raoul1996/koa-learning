const router = require('koa-router')()
const path = require('path')
const {uploadFile} = require('../utils/upload')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/upload', async (ctx, next) => {
  await ctx.render('upload', {
    title: 'Koa2 upload demo'
  })
})
router.post('/upload.json', async (ctx, next) => {
  {
    let result = {success: false}
    let serverFilePath = path.join(__dirname, 'upload-files')

    // upload file event
    result = await uploadFile(ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })
    ctx.body = result
  }
})
router.all('*', async (ctx, next) => {
  ctx.body = '<h1>404!!! o(╯□╰)o </h1>'
})

module.exports = router
