
import { User } from "../Model/User.js" ;
import bcrypt, { hash } from "bcryptjs" ; 
import jwt from "jsonwebtoken"   ;
import { sendVeficationCode } from "../Middleware/Email.js";



export const userRegister = async(req , res)=>{
      
    const {fullname , email ,password , mobile}  = req.body ; 

    // console.log(fullname , email , password , mobile) ;
   
    if(fullname == "" || email == "" || password == "" || mobile == "") return res.json({ message :"please fill all feild"})  ; 
     
    let user = await User.findOne({email}) ;

    if(user) return res.json({
        message : "this user already exits" ,
        success : false
    })

   const hashPassword = await bcrypt.hash(password , 10)  ; 

   user = await User.create({fullname , email , password : hashPassword , mobile}) ;  

   res.json({
    message : "user Register Successful" , 
       success : true , 
       user
   })
   


}

export const userLogin = async(req, res)=>{

    const {email , password}  = req.body  ;

    if(email== "" || password == "") return res.json({ message :  "all field is required" , success : true}) ;

    let validUser =  await User.findOne({email}) ;
      
    if(!validUser) return res.json("user Not found") ;
    
    let validPass  = await bcrypt.compare( password , validUser.password) ;
    
    if(!validPass) return res.json({message : "Invalid Password" , success : false}) ;  
    
    const token  =  jwt.sign({userId : validUser._id} , process.env.SECRET_KEY_LOGIN  , { expiresIn : '1d'})  ;

    console.log(token) ;

    res.json({
          message : "Login success"  ,
          token  ,
          success : true 
    }) 
        
}

export const sendOtp = async (req, res) => {
  try {

    const { email } = req.body;

    // console.log("this is email for reset Password" , email)

    const CheckEmail = await User.findOne({ email });

    if (!CheckEmail) {
      return res.json({
        message: "User not found. Enter another email",
        success: false,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // console.log("this is 6 digit otp" , otp)

    const hashOtp = await bcrypt.hash(otp, 10);

    const token = jwt.sign({ userId: CheckEmail._id, code: hashOtp }, process.env.SECRET_KEY_FOROGT_PASS , { expiresIn: 300 }  // 5 minutes in seconds
    );

    await sendVeficationCode(email , otp );   // 👈 ye agar fail hota hai toh try-catch me chala jayega

    return res.json({
      message: "Code sent successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log("Error in sendOtp:", error.message);
    return res.status(500).json({
      message: "Failed to send verification code",
      success: false,
    });
  }


};


export const setPassword = async(req , res)=>{

       let newPass = req.body.password ;

       let hashPass =  await bcrypt.hash(newPass , 10) ;
        
       let updatePassword = await User.findByIdAndUpdate( req.user._id ,  { password : hashPass} , {new : true} )
     
        if(!updatePassword) return res.json({
          message : "user not found" , 
          success : false
        })


      res.json({
        message : "Password Updated Successful" ,
        user : updatePassword ,
        success : false
      })
      
};
