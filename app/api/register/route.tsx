import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/app/api/models/User";
import { generateToken } from "@/app/utils/auth";
export async function POST(request: Request) {
   try {
      const { name, username, email, password } = await request.json();

      // Check for all input fields
      if (!name || !email || !password) {
         return NextResponse.json({
            status: 400,
            message: "Missing required fields",
         });
      }
      // Check if user already exists
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
         return NextResponse.json({
            status: 400,
            message: "User already exists",
         });
      }

      // create user
      const user = await createUser({ name, username, email, password });
      // Generate JWT token
      const token = generateToken(user._id.toString());

      // Set token as secure HttpOnly cookie
      const response = NextResponse.json({
         status: 200,
         message: "User created successfully",
         user,
      });
      response.cookies.set("authToken", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         path: "/",
         maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
   } catch (error) {
      return NextResponse.json({
         status: 500,
         message: "Internal server error: " + error,
      });
   }
}
