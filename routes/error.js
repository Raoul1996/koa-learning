const router = require('koa-router')()
const path = require('path')

router.all('*', async (ctx, next) => {
  ctx.body = '<h1>404!!! o(╯□╰)o </h1>'
})
module.exports = router