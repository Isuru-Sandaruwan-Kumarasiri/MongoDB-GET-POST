const User = require("../models/user");
//router is used to transfer data
const express = require("express"); //get express packge
const router = express.Router(); //get router function and assigned to the vaiable
const auth=require("../middleware/auth")


//loging router

router.post("/user/login",async(req,res)=>{
  try {
    const user =await User.findByCredentials(req.body.email,req.body.password);
    const token=await user.generateAuthToken();
    res.send(user);
  } catch (error) {
    res.status(401);
  }
})



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
});

router.get("/user",auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

//using param
router.get("/user/me",auth, async (req, res) => {
  //const _id = req.params.id; //postman aken den id eka("/user/:id" url included) assigned wenwa            //Internet needed for all js file run
   const _id=req.user._id;
  try {
    const user = await User.findById(_id); //find user by id
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/user/me",auth, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }); //new:true means request to get updated user
    if (!updateUser) {
      return res.status(400).send();
    }
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Delete Methods
router.delete("/user/me",auth, async (req, res) => {
   try {
     const  deleteUser = await User.findByIdAndDelete(req.user._id); 
     if (!updateUser) {
       return res.status(400).send();
     }
     res.status(200).send(deleteUser);
   } catch (error) {
     res.status(400).send(error);
   }
 });



 //logout method

 router.post("/users/logout", auth, async (req, res) => {
  try {
    console.log("Before Logout - Tokens:", req.user.tokens);
    
   
    req.user.tokens = req.user.tokens.filter((object) => {
      return object.token !== req.token;
    });

    console.log("After Logout - Tokens:", req.user.tokens);
    console.log("req.token-",req.token)

    await req.user.save();
    res.send();
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).send();
  }
});

module.exports = router;
