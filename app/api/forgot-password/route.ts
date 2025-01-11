import { NextResponse } from "next/server"; // Next.js Response API for server-side functions
import { findUserByEmail, savePasswordResetToken } from "@/app/api/models/User"; // User model utilities
import { sendResetEmail } from "@/app/utils/email"; // Email sending utility
import crypto from "crypto"; // Node.js library for secure random token generation

/**
 * Handles a POST request to initiate a password reset process.
 * Validates the user's email, generates a reset token, saves it, and sends a reset email.
 */
export async function POST(request: Request) {
   try {
      // Parse the request body to extract the user's email
      const body = await request.json();
      const { email } = body;

      // Validate email presence
      if (!email) {
         return NextResponse.json(
            { error: "Email is required" },
            { status: 400 } // Bad Request status code
         );
      }

      // Find the user in the database by email
      const user = await findUserByEmail(email);
      if (!user) {
         return NextResponse.json({ error: "User not found" }, { status: 400 }); // Not Found status code
      }

      // Generate a secure random token for password reset
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 3600 * 1000); // Token expires in 1 hour

      // Save the token and expiration date in the database for the user
      await savePasswordResetToken(user.id, resetToken, expiresAt);

      // Construct the password reset link
      const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth?action=reset-password?token=${resetToken}`;

      // Send the password reset email
      const emailSent = await sendResetEmail(email, resetLink);

      // Handle email sending failure
      if (!emailSent) {
         return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 } // Internal Server Error status code
         );
      }

      // Return success response
      return NextResponse.json({ message: "Password reset email sent" });
   } catch (error) {
      console.error("Error in password reset request:", error);
      return NextResponse.json(
         { error: "An internal error occurred" },
         { status: 500 } // Internal Server Error status code
      );
   }
}
