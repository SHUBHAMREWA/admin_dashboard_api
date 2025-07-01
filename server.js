import express from "express"  ;
import mongoose from "mongoose" ;
import  userRouter  from "./Routes/user.js" ;
import verifyUserRouter from "./Routes/verifyUser.js"
import {config} from "dotenv" ;  
import cors from "cors" ;

const app = express()  ; 


app.use(cors({
  origin: "https://admin-dashboard-five-opal.vercel.app",
  credentials: true
}));

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://admin-dashboard-five-opal.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});



app.use(express.json());

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