const Koa = require('koa')
const jsonp = require('koa-jsonp')
const app = new Koa()
// 使用中间件
app.use(jsonp())
app.use(async (ctx) => {

  ctx.body = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime()
    }
  }
})

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000')
})