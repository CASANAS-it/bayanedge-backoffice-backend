const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  // db_dbUrl:
  //   process.env.DB_HOST ||
  //   "bentestmongodb:pM8wzioeWseuCo0EZI3KIaX5BmihfZuExnfNHxN5H9C4sHIznpIisfOOlxTdQDoIKZCQKyujhJciKpIxt0M7ug==@bentestmongodb.mongo.cosmos.azure.com:10255/eVoucher_db?ssl=true",
  db_dbUrl: (process.env.DB_HOST || 'localhost:27017/bayan_edge_db'),
  publicPath: '../client/build',
  port: process.env.NODE_PORT || 6010,
  tokenSecret: 'B@y@an3Dge!!M()n3yFl()w',
  api: process.env.NODE_API != null ? process.env.NODE_API : '/api'
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
