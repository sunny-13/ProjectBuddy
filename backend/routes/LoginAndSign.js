const route = require('express').Router();
const {Profile, OTPTable} = require('../db/model');
const {generateHashSalt,validatePassword} = require('../passport/loginMiddlewares');
const sendEmailOtp = require('../middlewares/testingnodemailer');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./files");
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
})

route.post('/register',async (req,res)=>{
    try {
        const {email} = req.body;
        await OTPTable.deleteMany({email:email}); 
        const otpInt = Math.floor((Math.random()*9000)+1000);
        const OTP = otpInt.toString();
        await sendEmailOtp(email,OTP);
        const newOTP = await OTPTable.create({
            email:email,
            otp:OTP
        })
        res.status(201).json({msg:"successful"});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"Unsuccessful"});
    }
})

route.post('/verifyEmail',async (req,res)=>{
    try {
        const {otp,email} = req.body;
        let storedOtp = await OTPTable.findOne({email:email});
        storedOtp=storedOtp.otp;
        console.log(storedOtp);
        if(otp===storedOtp) return res.status(200).json({msg:"successful"});
        else return res.status(401).json({msg:"Incorrect OTP"});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"Unsuccessful"});
    }
})

route.post('/signup',async (req,res)=>{
    try {
        const { username , password , email } = req.body;
        const {hash,salt} = generateHashSalt(password);
        const newProfile = await Profile.create({
            username: username,
            email: email,
            hash: hash,
            salt: salt
        })

        console.log('Profile created'+newProfile);
        res.status(200).json({msg:"Successful"});

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"Unsuccessful"});
    }
})


route.get('/login',async (req,res)=>{
    const {email, password} = req.body;
    const profile = await Profile.findOne({email:email});
    if(!profile) return res.status(404).json({msg:"Not signed up"});
    const {hash, salt} = profile;
    const flag = validatePassword(password,hash,salt);
    if(flag) return res.status(201).json({msg:"login successful"});
    return res.status(400).json({msg:"Password Incorrect"});

})

module.exports = route;