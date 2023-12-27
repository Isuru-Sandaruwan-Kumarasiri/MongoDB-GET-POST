const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
require("./DB/mongoose");
const userRouter=require("./router/user");


const app=express();//express sever
//to create express sever ,should be create instance of object
// this is asever application

app.use(cors());
app.use(bodyParser.json());     //this sever can use any packages
app.use(userRouter);


//initilize port number
const port=5000;
app.listen(port,()=>{
    console.log("Sever is up and running on port"+port);
})