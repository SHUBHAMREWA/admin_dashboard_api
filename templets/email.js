

const dateTime = new Date(Date.now()).toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  hour12: true,
});


export const send_email_template = ` <!DOCTYPE html>
                                        <html>
                                        <body style="font-family: sans-serif; padding: 20px;">
                                            <h3>OTP is here</h3>
                                            <p><strong>Your OTP:</strong> {otp} </p>
                                            <p><strong>Valid for:</strong> 5 minutes</p>
                                            <p><strong>Requested on:</strong> ${dateTime}</p>
                                        </body>
                                        </html>`  ;

