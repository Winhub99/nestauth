import User from "@/models/UserModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
// const transporter = nodemailer.createTransport({

// })

export const sendEmail = async ({ email, emailType, userId }: any) => {
    //TODO: configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000
        });
    } else if (emailType === "RESET") {
        await User.findOneAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000
        })
    }
    try {
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "73b5f9b68890f5",
              pass: "27e407d7649461"
            }
          });


        const mailOptions = {
            from: 'vinod8mehta@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?${hashedToken}">here</a> to ${emailType==="VERIFY"? "verify your email":"reset your password"} or copy and paste the link below in your browser. <br/>
            ${process.env.DOMAIN}/verifyemail?${hashedToken}
            </p>`, // html body
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
