const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const pathToPrivKey = path.join(__dirname,'rsa_priv.pem');
const privateKey = fs.readFileSync(pathToPrivKey,'utf8');

const generateHashSalt = (password) =>{
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');

    return {
        hash:hash,
        salt:salt
    }
}

const validatePassword = (password,hash,salt)=>{
    const hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return hash === hashVerify;
}


const issueJWT = (user) =>{
    const id= user._id;
    const expiresIn= '1d';
    
    const payload = {
        sub:id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload,privateKey,{expiresIn:expiresIn,algorithm:'RS256'});

    return {
        token: 'Bearer '+ signedToken,
        expires: expiresIn 
    }
}

module.exports = {generateHashSalt, validatePassword, issueJWT};
