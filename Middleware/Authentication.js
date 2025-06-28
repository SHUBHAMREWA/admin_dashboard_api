
import jwt from "jsonwebtoken" ;
import { User } from "../Model/User.js";
import bcrypt from "bcryptjs";

export const isAuth  = async(req , res ,next)=>{

        let token = req.headers.auth ; 
        
        if(!token) return res.json({
            message : "send code to email First" , 
            success : false
        })

       try{

        let verifyToken = jwt.verify(token ,"forgot_user") ;
        
        let user = await User.findById(verifyToken.userId ) ; 

    //    console.log(user)
  
            if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
        });
        }

         let verifyCode = await bcrypt.compare(req.body.code , verifyToken.code) ;

         if(!verifyCode) return res.json({ message : "Invalid code try again" ,  success : false })  

         req.user = user;

         next()

                
       }
       catch(error){
        console.log(error) ;
        return res.json({
            message : error.name  ,
            success : false 
        })
       }
       

}



