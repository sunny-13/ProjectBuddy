const route = require('express').Router();
const {Profile}  =  require('../db/model');

route.get('/', async(req,res)=>{
    try{
        const profiles = await Profile.find({});
        res.status(200).json({profiles:profiles});
    }
    catch(error){
        console.log(error);
        res.status(400).json({msg:"Oops! Something went wrong"});
    }
})

route.get("/single/:email", async (req,res)=>{
    try{
        
        const email = req.params.email;
        const profile = await Profile.find({email:email});
        console.log('profile'+ profile);
        if(!profile) return res.status(404).json({msg:"profile not found"});
        res.status(200).json({profile:profile});
    }
    catch(error){
        console.log(error);
        res.status(400).json({msg:"Oops! Something went wrong"});
    }
})

route.get('/multiple/:username', async(req,res)=>{
    try{
        const username = req.params.username;
        const profiles = await Profile.find({username:username});
        if(!profiles) return res.status(404).json({msg:"No such profile exisits"});
        res.status(200).json({profiles:profiles});
    }
    catch(error){
        console.log(error);
        res.status(400).json({msg:"Oops! Something went wrong"});
    }
})

module.exports = route;