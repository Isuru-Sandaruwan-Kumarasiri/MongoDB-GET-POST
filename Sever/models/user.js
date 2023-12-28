const mongoose=require("mongoose");

//to craete template use schema class

const Shema=mongoose.Schema;//access to Schema class

//create Shema object  for user and define template
const userShema=new Shema({
        name : {
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,//set as primary key
            trim:true   //remove white spaces
        },
        age :{
            type:Number,
            required:true
        }
})

//using template ,create model
const User=mongoose.model("User",userShema);
module.exports=User;
