require('dotenv').config()

let PORT = process.env.PORT
let DB_URI = process.env.MONGODB_URI

module.exports =  {PORT, DB_URI}