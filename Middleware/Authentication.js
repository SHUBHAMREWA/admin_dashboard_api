
import jwt from "jsonwebtoken" ;
import { User } from "../Model/User.js";
import bcrypt from "bcryptjs";

export const isAuth  = async(req , res ,next)=>{

        let token = req.headers.forgotauth ; 
        
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

         if(!verifyCode) return  res.status(409).json({
                                                        message: "verification failed"
                                                        })
         req.user = user;

         next()

                
       }
       catch(error){
        return   res.status(409).json({
                 message: "verification failed"
                                         })
       }
       

}



