
const User=require("../models/user");
//router is used to transfer data 
const express=require("express");//get express packge
const router=express.Router();//get router function and assigned to the vaiable

//localhost:5000
   router.post("/user",async(req,res)=>{
    //used User model creating new User object
       const newUser=new User(req.body);
       
       try {
        await newUser.save();
        res.status(201).send(newUser);
       } catch (error) {
        res.status(400).send(error);
       }
})
module.exports=router;