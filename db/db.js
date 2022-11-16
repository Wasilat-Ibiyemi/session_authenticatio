const mongoose = require('mongoose')
require('dotenv').config()

const MDB_URI = process.env.MONGODB_URI

function connectURI() {
    mongoose.connect(MDB_URI)

    mongoose.connection.on('connected', () => {
        console.log('connection to mongodb successful')
    })

    mongoose.connection.on('error', (err) => {
        console.log(err)
        console.log('an error occured')
    })
}

module.exports = { connectURI }