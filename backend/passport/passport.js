const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtactJWT = require('passport-jwt').ExtractJwt;

const fs = require('fs');
const path = require('path');

const pathToPublicKey = path.join(__dirname+'rsa_pub.pem');
const publicKey = fs.readFileSync(pathToPublicKey,'utf8');
const { Profile } = require('../db/model')

const options = {
    jwtFromRequest: ExtactJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithms: ['RS256']
}


passport.use(new JWTStrategy(options, (jwt_payload,done)=>{

    Profile.findOne({_id:jwt_payload.sub},(err,profile)=>{
        if(err) return done(err,false);
        if(profile) return done(null,profile);
        else return done(null,false);
    })

}))
