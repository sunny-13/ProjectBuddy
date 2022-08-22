const nodemailer = require("nodemailer");

const sendEmailOtp = async(receiverEmail,OTP) =>{
    try {
        let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            secure:true,
            port:"587",
            service:"gmail", 
            auth: {
              user: "sunnysingh93044@gmail.com", 
              pass: "zgfqotuvobpuxidk", 
            },
          });
        
          let info = await transporter.sendMail({
            from: '"ProjectBuddy" <sunnysingh93044@gmail.com>', 
            to: receiverEmail, 
            subject: "OTP for ProjectBuddy Signup", 
            text: `Your OTP for registering your email is ${OTP}.
            Thank you!`, 
          });
        
          console.log("Message sent: %s", info.messageId);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmailOtp;