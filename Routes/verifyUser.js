
import express from "express"  ; 
import { verifyUser } from "../Controller/verifyUser.js";



const router = express.Router() ; 



router.get("/verify-token/:token" , verifyUser )

export default router ;