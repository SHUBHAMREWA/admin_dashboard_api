
import mongoose from "mongoose" ;

const userSchema = mongoose.Schema({
       fullname : {type : String , require : true}  , 
       mobile : {type : String , require : true } ,
       email : {type : String , require : true}  ,
       password : {type : String , require : true} ,
       CreatedAt : {type : Date , default :Date.now }
})


export  const User  = mongoose.model("user" , userSchema) ;