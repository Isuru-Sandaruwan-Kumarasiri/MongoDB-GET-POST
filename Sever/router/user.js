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
});

router.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

//using param
router.get("/user/:id", async (req, res) => {
  const _id = req.params.id; //postman aken den id eka(url included) assigned wenwa

  try {
    const user = await User.findById(_id);//find user by id
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
