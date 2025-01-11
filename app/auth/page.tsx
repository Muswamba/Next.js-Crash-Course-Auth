"use client";
import { AppProvider } from "@toolpad/core";
import Login from "../components/LoginTemplate";
import ForgotPassowrdEmail from "../components/ForgotPassowrdEmailTemplate";
import ResetPassword from "../components/ResetPasswordTemplate";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export default function AuthPage() {
   //
   const searchParams = useSearchParams();
   const actionRaw = searchParams.get("action") || ""; // Get raw action query parameter
   const action = actionRaw.split("?")[0]; // extra action before any "?"

   // Get token query parameter
   const token = actionRaw.includes("reset-password")
      ? new URLSearchParams(actionRaw.split("?")[1]).get("token")
      : null;

   const renderTemplate = () => {
      //  handle the reset password template
      if (action?.startsWith("reset-password")) {
         //  check if the token is valid
         if (!token) {
            return (
               <AppProvider>
                  <div className="flex justify-center items-center h-screen">
                     <div className="block">
                        <h3 className="text-2xl font-bold red-500">
                           Error: Missing token
                        </h3>
                        <p>The prodived token is not valid</p>

                        {/* Back to reset token  */}
                        <Link href="/auth?action=reset-password">
                           Back to reset password
                        </Link>
                     </div>
                  </div>
               </AppProvider>
            );
         }
         return <ResetPassword token={token} />;
      }
      // switch template
      switch (action) {
         case "forgot-password":
            return <ForgotPassowrdEmail />;
         case "login":
            return <Login />;
         default:
            return (
               <AppProvider>
                  {/* Error invalid action */}
                  <div className="flex justify-center items-center h-screen">
                     <div className="block">
                        <h3 className="text-2xl font-bold red-500">
                           Error: Invalid action
                        </h3>
                        <p>The prodived action is not valid</p>
                     </div>
                  </div>
               </AppProvider>
            );
      }
   };
   return <div key={`${action}-${token}` || ""}>{renderTemplate()}</div>;
}
