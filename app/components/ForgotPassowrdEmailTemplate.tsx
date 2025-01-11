import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { FormInput, SubmitButton } from "@/app/components/FormComponents";
import AppLogo from "./AppLogo";
import { CustomError } from "../utils/types";
import axios from "axios";
const ForgotPassowrdEmail = () => {
   const [email, setEmail] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const [message, setMessage] = useState<string>("");

   useEffect(() => {
      setMessage("");
      setError("");
   }, [email]);

   //
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!email) return setError("Email is required.");
      // validate email
      if (!email.includes("@")) {
         return setError("Invalid email.");
      }
      // send email to reset password
      setLoading(true);
      setError("");
      setMessage("");
      try {
         const response = await axios.post(
            "/api/forgot-password",
            {
               email,
            },
            {
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         setLoading(false);
         setMessage(response.data.message);
      } catch (err) {
         setLoading(false);
         const error = err as CustomError;
         console.log(error);
         setError(error.response?.data?.error || "An error occurred: " + err);
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
               <h2 className="text-2xl font-bold text-center mb-5">
                  Forgot Password
               </h2>
               {error && (
                  <p className="text-red-500 text-center mb-5">{error}</p>
               )}
               {message && (
                  <p className="text-green-500 text-center mb-5">{message}</p>
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

                  <div className="flex justify-between space-x-4">
                     <div className="shrink-0">
                        <Link
                           href="/auth?action=login"
                           className="flex items-center space-x-2">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6">
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                              />
                           </svg>
                           <span>Back to loing</span>
                        </Link>
                     </div>
                     <SubmitButton
                        text={"Send reset link"}
                        loading={loading}
                     />
                  </div>
               </form>
            </div>
         </main>
      </div>
   );
};
export default ForgotPassowrdEmail;
