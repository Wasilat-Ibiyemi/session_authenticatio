const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

const userModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

//to handle salt and hash
userModel.plugin(passportLocalMongoose)

module.exports = mongoose.model('users', userModel) //'users' name in db collection