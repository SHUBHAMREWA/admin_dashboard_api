

import express from "express"  
import { userRegister  , userLogin , sendOtp ,setPassword } from "../Controller/user.js";
import { isAuth } from "../Middleware/Authentication.js";

const router = express.Router() ;


router.post( "/signup" , userRegister)   ;

router.post("/login" , userLogin ) ; 

router.post("/forgot-password" , sendOtp ) ; 

router.put("/forgot-password" , isAuth , setPassword)

export default router ;