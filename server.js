
import express from "express"  ;
import mongoose from "mongoose" ;
import  userRouter  from "./Routes/user.js" ;
import verifyUserRouter from "./Routes/verifyUser.js"
import bodyParser from "express" ;
import {config} from "dotenv" ;  
import cors from "cors" ;

const app = express()  ; 

app.use(express.json());



// ✅ Step 1: Define allowed origin
const allowedOrigins = ["https://admin-dashboard-five-opal.vercel.app"];

// ✅ Step 2: Use CORS with dynamic origin check
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Step 3: Manually handle OPTIONS preflight (important for Render)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://admin-dashboard-five-opal.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200);
});


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