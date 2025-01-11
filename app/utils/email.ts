import nodemailer from "nodemailer";

// Function to send a password reset email
export async function sendResetEmail(
   recipientEmail: string,
   resetLink: string
): Promise<boolean> {
   try {
      // Validate environment variables
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
      if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
         throw new Error(
            "SMTP configuration is missing. Please check your environment variables."
         );
      }

      // Create a transporter object using SMTP transport
      const transporter = nodemailer.createTransport({
         host: SMTP_HOST, // SMTP server host
         port: Number(SMTP_PORT), // SMTP server port
         secure: parseInt(SMTP_PORT, 10) === 465, // SSL for port 465, otherwise STARTTLS
         auth: {
            user: SMTP_USER, // SMTP server username
            pass: SMTP_PASSWORD, // SMTP server password
         },
      });

      // Email options
      const mailOptions = {
         from: `"My Portfolio App" <${SMTP_USER}>`, // Sender address
         to: recipientEmail, // Recipient email
         subject: "Password Reset Request", // Subject line
         html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
               <h2 style="color: #333;">Password Reset Request</h2>
               <p>Hello,</p>
               <p>
                  We received a request to reset your password. Please click the link
                  below to reset your password:
               </p>
               <a href="${resetLink}" 
                  style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                  Reset Password
               </a>
               <p>If you didn’t request this, you can safely ignore this email.</p>
               <p>Thanks, <br />My Portfolio App</p>
            </div>
         `, // HTML content of the email
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);

      return true; // Email sent successfully
   } catch (error) {
      console.error("Error sending password reset email:", error);
      return false; // Email sending failed
   }
}
