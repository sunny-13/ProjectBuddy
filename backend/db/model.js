const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: String,
    email: String,
    hash: String,
    salt: String,
    img:{
        data:Buffer,
        contentType:String
    }
})

const OTPSchema = new mongoose.Schema({
    email:String,
    otp:String
})

const OTPTable = mongoose.model('OTPTable',OTPSchema,'OTPTable');

const Profile = mongoose.model('Profile',profileSchema,'Profile');
module.exports = {Profile, OTPTable};