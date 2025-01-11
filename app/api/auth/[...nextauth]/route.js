import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "@/app/api/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            // validate credentials from the database
            if (!credentials) {
               throw new Error("Invalid credentials");
            }
            if (!credentials?.email) {
               throw new Error("Invalid email");
            }
            if (!credentials?.password) {
               throw new Error("Invalid password");
            }

            const user = await findUserByEmail(credentials.email);
            if (!user) {
               throw new Error("User not found");
            }
            const isPasswordCorrect = await bcrypt.compare(
               credentials?.password,
               user.password
            );
            if (!isPasswordCorrect) {
               throw new Error("Invalid password");
            }
            return {
               id: user._id.toString(),
               name: user.name,
               email: user.email,
               username: user.username,
               image: user.image,
            };
         },
      }),
   ],
   pages: {
      signIn: "/auth?action=login", // Redirect to a custom login page
   },
   // session options
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
};
// The NextAuth.js authentication handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
