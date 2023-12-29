const bcrypt = require("bcryptjs/dist/bcrypt");
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
        },
        password:{
            type:String,
            trim:true,
            required:true,
        }
});

userShema.pre("save",async function(next){
    //.pre--->user save karnn kalin  monwad krann oni function run karnne ,save func ekat kalin
    //mona function ekad kiyala parameter ekak vidiyat denn oni"save()"
    //next--->next step ekat yannn kiyala order eka denne

    const user=this;//save karn user attributs okkom assigned karna variable ekt

    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8) //pasword=password+1 like this line/8-algorithem eka run wen ganana
    }

});

userShema.statics.findByCredentials=async(email,password)=>{
    //user kenekw create karn natuw user collection eka access karnn hadana method ekak
    //mehidi user use karla findone method walin password ,email check karana eka

    const user=await User.findOne({email})//{email} means {email:email}

    if (!user){
        throw new Error;
    }
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error;
    }

    return user;
}






//using template ,create model
const User=mongoose.model("User",userShema);
module.exports=User;
