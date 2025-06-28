
import { transporter } from "./Email.config.js";
import { send_email_template } from "../templets/email.js";
  
export const sendVeficationCode = async(email , veryficationCode)=>{

    try{
          const info = await transporter.sendMail({
                    from: '" Code for Verifation " <kushwahashubham5932@gmail.com>',
                    to: email,
                    subject: "verification Code from Mui Project 🗨️",
                    text: "this code is valid for 5 minute", // plain‑text body
                    html: send_email_template.replace("{otp}" , String(veryficationCode))  // HTML body
                });

                console.log("success" , info)
    }
    catch(error){
          console.log( "this is error" , error)
    }


}
