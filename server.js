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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://admin-dashboard-five-opal.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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




const port = process.env.PORT || 5000 ;

app.listen(port , ()=>console.log(`server is running on port = ${port}`)) ;