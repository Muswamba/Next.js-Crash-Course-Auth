import { NextResponse } from "next/server";
import { User } from "@/app/api/models/User"; // Import the User model
import { hashPassword } from "@/app/utils/password"; // Password hashing utility
import { NextRequest } from "next/server"; // Next.js Request object

/**
 * Handles a POST request to reset the user's password.
 * Validates the reset token, updates the password, and sends a response.
 */
export async function POST(request: NextRequest) {
   try {
      // Parse the request body to get the new password and reset token
      const body = await request.json();
      const { token, newPassword } = body;
      // Validate input
      if (!token || !newPassword) {
         return NextResponse.json(
            { error: "Token and new password are required" },
            { status: 400 } // Bad Request status code
         );
      }

      // Find the user by reset token (we'll use the token and check expiry)
      const user = await User.findOne({ resetToken: token }).exec();
      if (!user) {
         return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 400 } // Bad Request status code
         );
      }

      // Check if the token has expired
      if (new Date() > new Date(user.resetTokenExpires)) {
         return NextResponse.json(
            { error: "Reset token has expired" },
            { status: 400 } // Bad Request status code
         );
      }

      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);

      // Update the user's password in the database
      await User.findByIdAndUpdate(user._id, {
         password: hashedPassword,
         resetToken: null, // Clear the reset token
         resetTokenExpires: null, // Clear the token expiration
      }).exec();

      // Return success message
      return NextResponse.json({ message: "Password reset successfully" });
   } catch (error) {
      console.error("Error in resetting password:", error);
      return NextResponse.json(
         { error: "An internal error occurred" },
         { status: 500 } // Internal Server Error status code
      );
   }
}
