const Koa = require('koa')
const app = new Koa()
// koa template middleware
const views = require('koa-views')
const path = require('path')
const json = require('koa-json')
const onError = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const restc = require('restc')
const index = require('./routes/index')
const users = require('./routes/users')
// error handler
onError(app)

// middleware
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(restc.koa2())
// defined the static dir
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
module.exports = app
