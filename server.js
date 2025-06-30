
import express from "express"  ;
import mongoose from "mongoose" ;
import  userRouter  from "./Routes/user.js" ;
import verifyUserRouter from "./Routes/verifyUser.js"
import bodyParser from "express" ;
import {config} from "dotenv" ;  
import cors from "cors" ;

const app = express()  ; 
app.use(bodyParser.json())  ;

// ✅ Allow only your Vercel frontend
app.use(cors({
  origin: "https://admin-dashboard-five-opal.vercel.app",  // ✅ Your frontend domain
  credentials: true,   // agar tu cookie ya token bhej raha hai
}));

// .env setup 
config({path : ".env"})


mongoose.connect(  process.env.MONGO_URL , {
    dbName  : "muiProject"
})
.then(()=>{
    console.log("mongoDb is Connected")
})
.catch((error)=>{
    console.log(error)
})



// user routes  , Register , Login and , Forgot Password  
app.use("/user" , userRouter)
app.use("/user" , verifyUserRouter) 




const port = process.env.PORT ;

app.listen(port , ()=>console.log(`server is running on port = ${port}`)) ;