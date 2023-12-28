const User = require("../models/user");
//router is used to transfer data
const express = require("express"); //get express packge
const router = express.Router(); //get router function and assigned to the vaiable

//localhost:5000
router.post("/user", async (req, res) => {
  //used User model creating new User object
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }

  router.get("/user",async(req,res)=>{
   try {
      const users=await User.find({id:"658d09fb267fe8e71a565e45"});
      res.status(200).send(users);
   } catch (error) {
      res.status(400).send(error);
   }
  });
});
module.exports = router;
