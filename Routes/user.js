

import express from "express"  
import { userRegister  , userLogin , sendOtp ,setPassword } from "../Controller/user.js";
import { isAuth } from "../Middleware/Authentication.js";

const router = express.Router() ;


router.post( "/register" , userRegister)   ;

router.post("/login" , userLogin ) ; 

router.post("/reset-password" , sendOtp ) ; 

router.put("/set-passwored" , isAuth , setPassword)

export default router ;