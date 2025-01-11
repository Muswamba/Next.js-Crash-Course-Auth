"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
   FormInput,
   Checkbox,
   SubmitButton,
} from "@/app/components/FormComponents";
import { AppProvider } from "@toolpad/core";
import AppLogo from "@/app/components/AppLogo";
import { CustomError } from "@/app/utils/types";

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [agreeToTerms, setAgreeToTerms] = useState(false);
   const [error, setError] = useState<string | null>(null); // Tracks error messages to provide feedback

   const [loading, setLoading] = useState(false);

   const router = useRouter();

   const handleRegister = async (e: FormEvent) => {
      e.preventDefault();
      setError(null);

      // Client-side validation
      if (!name) return setError("Name is required.");
      if (username.length < 3)
         return setError("Username must be at least 3 characters.");
      if (!email.includes("@")) return setError("Invalid email.");
      if (password.length < 8)
         return setError("Password must be at least 8 characters.");
      if (!agreeToTerms) return setError("You must agree to the terms.");

      setLoading(true);

      try {
         const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, username, email, password }),
         });
         const data = await response.json();

         if (response.ok) {
            router.push("/auth?action=login");
         } else {
            setError(data.error || "Registration failed.");
         }
      } catch (err) {
         // / Refine the type of error using a type assertion
         const error = err as CustomError;
         // Handle unexpected errors (e.g., network issues, server errors)
         setError(
            error.response?.data?.error || "An unexpected error occurred."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <AppProvider>
         <div className="max-w-md mx-auto text-stone-500 dark:text-stone-100  shadow-lg shadow-slate-600 p-8 rounded-lg mt-10">
            {/* TODO: Add logo */}
            <div className="flex justify-center mb-4">
               <AppLogo size={70} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-5">Sign Up</h2>
            {error && <p className="text-red-500 text-center mb-5">{error}</p>}
            <form onSubmit={handleRegister}>
               <FormInput
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={loading}
               />
               <FormInput
                  id="username"
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={loading}
               />
               <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
               />
               <FormInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
               />
               {/* if password  */}
               {password && (
                  <div className="flex justify-between items-center mb-5 w-full">
                     <div className="flex justify-start">
                        {/* if password is longer than 8 characters */}
                        {password.length >= 8 ? (
                           <div className="flex items-center">
                              <span className="text-green-500 mr-2">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6">
                                    <path
                                       fillRule="evenodd"
                                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 0z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </span>
                              <span className="text-sm text-green-500">
                                 Password is strong
                              </span>
                           </div>
                        ) : (
                           <div className="flex items-center">
                              <span className="text-red-500 mr-2">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6">
                                    <path
                                       fillRule="evenodd"
                                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 0z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </span>
                              <span className="text-sm text-red-500">
                                 Password is weak
                              </span>
                           </div>
                        )}
                     </div>
                     {/* Toggle password visibility */}
                     <div className="">
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="text-sm text-blue-500 mt-2">
                           {showPassword ? "Hide Password" : "Show Password"}
                        </button>
                     </div>
                  </div>
               )}
               <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  label="I agree to the terms and conditions."
               />
               <SubmitButton
                  loading={loading}
                  text="Sign Up"
               />
            </form>
            <p className="text-sm text-center mt-5">
               Already have an account?{" "}
               <Link
                  href="/auth?action=login"
                  className="text-blue-500 underline">
                  Sign In
               </Link>
            </p>
         </div>
      </AppProvider>
   );
};

export default Register;
