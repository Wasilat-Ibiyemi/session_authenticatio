require('dotenv').config()

const PORT = process.env.PORT
const secret = process.env.SESSION_SECRET

module.exports = { PORT, secret } //export the port as a object for it to be connected on the app.js