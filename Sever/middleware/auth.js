
//this function is running on parameter of routing function.if this function function ran,body of router function will run
//router funtion walt request vlid kiala balnne me function aken,mehidi token eka check karnawa
//me funtion ake header ekat toket ekak dala ewan token eka eka hrinam vitri router function ake body ake code run karnne

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth=async(req,res,next)=>{
      try {
         const token=req.header("Authorization").replace("Bearer ","");
         const decoded=jwt.verify(token,"mysecret");

        
         //console.log(decoded) -->output{ _id: '658fff735fde6a4ac69bee69', iat: 1703935982 }

         const user=await User.findOne({
            _id:decoded._id,
            "tokens.token":token
         });

         if(!user){
            throw new Error;
         }
         req.user=user;//hoyagtt user request ekat attach karnwa
         next();
      } catch (error) {
        res.status(401).send({error:"please auth"});
      }
}
module.exports=auth;