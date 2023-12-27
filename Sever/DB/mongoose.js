//connect mongoDB 
const mongoose=require("mongoose");
const URL="mongodb+srv://isurusandaruwan0601:isuru789@cluster0.vklna5u.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


//mongoose connection assigned to variable
const connection=mongoose.connection
mongoose.set("strictQuery",true)

connection.once("open",()=>{
    console.log("MongoDB connected...")
});
