const {query} = require('./async-db')

async function selectAllData() {
  let sql = 'SELECT * FROM my_table'
  return await query(sql)
}

async function getData() {
  let dataList = await selectAllData()
  console.log(dataList)
}

getData()