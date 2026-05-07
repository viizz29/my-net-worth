"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/app/auth/auth-provider";
import { ReactQueryClientProvider } from "@/app/components/react-query-client-provider";
import { LocalStorageProvider } from "@/app/misc/local-storage-provider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <LocalStorageProvider>
        <AuthProvider>{children}</AuthProvider>
      </LocalStorageProvider>
    </ReactQueryClientProvider>
  );
}
