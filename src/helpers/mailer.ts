import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async({email , emailType , userId}:any) =>
    {
        try{
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)


            // TODO configure mail fir usage
            if(emailType === 'verify'){
                await User.findByIdAndUpdate(userId,
                     {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000} // 1 hour expiry
                    )
                }
                else if(emailType === 'reset'){
                    await User.findByIdAndUpdate(userId,
                     {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000} // 1 hour expiry
                    )
                }



            // Looking to send emails in production? Check out our Email API/SMTP product!
            var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d5e641fa11cb40",
                pass: "623ea536d69b85"
            }
            });
         

        const mailOptions = {
            from: 'aks',
            to: "bar@example.com, baz@example.com",
            subject: emailType === 'verify' ? 'Verify your email' : 'Reset your password',
            text: "Hello world?", // plain‑text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'verify' ? 'verify your email' : 'reset your password'} or copy and paste the link below in the browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // HTML body
        }

        const mainResponse = await transport.sendMail(mailOptions)
        return mainResponse;
    }

        catch(error:any) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    } 