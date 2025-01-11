"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ClientSessionProviderProps {
   children: ReactNode;
}
export function ClientSessionProvider({
   children,
}: ClientSessionProviderProps) {
   return <SessionProvider>{children}</SessionProvider>;
}
