import { useState, FormEvent } from "react";
import Link from "next/link";
import { FormInput, SubmitButton } from "@/app/components/FormComponents";
import AppLogo from "./AppLogo";
import { useRouter } from "next/navigation";
import { AppProvider } from "@toolpad/core";
import { CustomError } from "../utils/types";
const ResetPassword = ({ token }: { token: string }) => {
   const [newPassword, setNewPassword] = useState<string>("");
   const [confirmPassword, setConfirmPassword] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const [success, setSuccess] = useState<string>("");
   const router = useRouter();

   if (!token) {
      return (
         <AppProvider>
            <div className="flex justify-center items-center h-screen">
               <div className="block">
                  <h3 className="text-2xl font-bold red-500">
                     Error: Missing token
                  </h3>
                  <p>The provided token is not valid</p>
                  <Link href="/auth?action=reset-password">
                     Back to reset password
                  </Link>
               </div>
            </div>
         </AppProvider>
      );
   }

   //
   const handleResetPassword = async (e: FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      // Basic validation
      if (newPassword.length < 8) {
         return setError("Password must be at least 8 characters.");
      }
      if (newPassword !== confirmPassword) {
         return setError("Passwords do not match.");
      }

      setLoading(true);

      try {
         const response = await fetch("/api/forgot-password/new-password", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, newPassword }),
         });

         const data = await response.json();

         if (response.ok) {
            setSuccess("Password reset successfully. Redirecting to login...");
            setTimeout(() => router.push("/auth?action=login"), 3000);
         } else {
            setError(
               data.error || "Failed to reset password. Please try again."
            );
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
      <div className="max-w-md mx-auto dark:bg-slate-900 shadow-lg shadow-gray-400 p-8 rounded-lg mt-10">
         <main className="flex justify-center mb-4">
            <div className="w-full px-2 md:px-6 py-8">
               {/* TODO: Add logo */}
               <div className="flex justify-center mb-4">
                  <AppLogo size={70} />
               </div>
               <h2 className="text-2xl font-bold text-center mb-5">
                  New Password
               </h2>
               {error && (
                  <p className="text-red-500 text-center mb-5">{error}</p>
               )}
               {success && (
                  <p className="text-green-500 text-center mb-5">{success}</p>
               )}
               <form
                  className="max-w-lg mx-auto"
                  onSubmit={handleResetPassword}>
                  <FormInput
                     id="newPassword"
                     label="New Password"
                     type="password"
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     placeholder="Password"
                  />

                  <FormInput
                     id="confirmPassword"
                     label="Confirm Password"
                     type="password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder="Confirm Password"
                  />

                  <div className="flex justify-between">
                     <SubmitButton
                        text={"Reset Password"}
                        loading={loading}
                     />
                  </div>
               </form>
            </div>
         </main>
      </div>
   );
};
export default ResetPassword;
