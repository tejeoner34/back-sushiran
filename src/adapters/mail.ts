import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

 export const sendMail = (to:string, subject:string, content:string) => {

    const user = process.env.MAIL_USER
    const pass = process.env.MAIL_PASS

            const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: user,
                pass: pass
            }
        });

        const message = {
            from: 'ProjectsProgramming <projectsprogramming34@gmail.com>',
            to,
            subject,
            html: content 
        };


        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return
            }
            console.log('Message sent: %s', info.messageId);

             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    
}