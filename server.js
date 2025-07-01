import express from "express"  ;
import mongoose from "mongoose" ;
import  userRouter  from "./Routes/user.js" ;
import verifyUserRouter from "./Routes/verifyUser.js"
import {config} from "dotenv" ;  
import cors from "cors" ;

const app = express()  ; 

// ✅ Step 1: .env config (ye sabse upar hona chahiye)
config({ path: ".env" });

// ✅ Step 2: CORS Setup (before all routes)
const allowedOrigin = "https://admin-dashboard-five-opal.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// ✅ Step 3: Handle preflight requests manually (optional but safer)
app.options("*", cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json())  ;


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