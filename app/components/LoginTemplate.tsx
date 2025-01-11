import { useState, FormEvent } from "react";
import Link from "next/link";
import AppLogo from "./AppLogo";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
   FormInput,
   Checkbox,
   SubmitButton,
} from "@/app/components/FormComponents";
import { CustomError } from "../utils/types";

const Login = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [rememberMe, setRememberMe] = useState<boolean>(false);
   const [error, setError] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const router = useRouter();
   const { data: session } = useSession();
   useEffect(() => {
      if (session) {
         router.push("/dashboard"); // Redirect to dashboard if session exists
      }
   }, [session]);

   //
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!email) return setError("Email is required.");
      if (!password) return setError("Password is required.");
      // validate email
      if (!email.includes("@")) {
         return setError("Invalid email.");
      }

      setLoading(true);
      try {
         const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/dashboard",
         });

         if (response?.ok) {
            router.push(response.url || "/dashboard");
         } else {
            setError(response?.error || "Login failed, please try again.");
         }
      } catch (err) {
         const error = err as CustomError;
         setError(error.response?.data?.error || "Login failed.");
      }
   };
   return (
      <div className="max-w-md mx-auto dark:bg-slate-900 shadow-lg shadow-gray-400 p-8 rounded-lg mt-10">
         <main className="flex justify-center mb-4">
            <div className="w-full px-2 md:px-6 py-8">
               {/* TODO: Add logo */}
               <div className="flex justify-center mb-4">
                  <AppLogo size={70} />
               </div>
               <h2 className="text-2xl font-bold text-center mb-5">Sign In</h2>
               {error && (
                  <p className="text-red-500 text-center mb-5">{error}</p>
               )}

               <form
                  className="max-w-lg mx-auto"
                  onSubmit={handleSubmit}>
                  <FormInput
                     id="email"
                     label="Email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Enter your email"
                  />
                  <FormInput
                     id="password"
                     label="Password"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Password"
                  />
                  <div className="flex justify-between items-center mb-5">
                     <Checkbox
                        checked={rememberMe}
                        label="Remember me"
                        onChange={(e) => setRememberMe(e.target.checked)}
                     />

                     <div className="">
                        <Link
                           href="/auth?action=forgot-password"
                           className="ml-2 underline text-blue-500 text-xs md:text-sm">
                           Forgot your password?
                        </Link>
                     </div>
                  </div>
                  <div className="flex justify-between">
                     <SubmitButton
                        text={"Sign In"}
                        loading={loading}
                     />
                  </div>
               </form>
               <p className="text-sm text-center mt-5">
                  You don&apos;t have an account?{" "}
                  <Link
                     href="/register"
                     className="text-blue-500 underline">
                     Sign Up
                  </Link>
               </p>
            </div>
         </main>
      </div>
   );
};
export default Login;
