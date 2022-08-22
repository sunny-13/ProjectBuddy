require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const MONGO_URI = process.env.MONGO_URI;
const connectDB = require('./db/connect');
const LoginAndSignupRoute = require('./routes/LoginAndSign');
const FetchProfile = require('./routes/FetchProfile');

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',LoginAndSignupRoute);
app.use('/fetch',FetchProfile);

const startServer= async() =>{
    try {
        app.listen(3001,()=> console.log('server running'));
        connectDB(MONGO_URI);
        
    } catch (error) {
        console.log(error);
    }
}

startServer();