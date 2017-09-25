const router = require('koa-router')()
const path = require('path')
const {uploadFile} = require('../utils/upload')
router.prefix('/upload')
router.get('/sync', async (ctx, next) => {
  await ctx.render('upload-sync', {
    title: 'Koa2 upload-sync'
  })
})
router.get('/async', async (ctx, next) => {
  await ctx.render('upload-async', {
    title: 'Koa2 upload-async'
  })
})
module.exports = router