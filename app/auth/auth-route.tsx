"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

export const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && user) {
      router.replace("/");
    }
  }, [isAuthReady, router, user]);

  if (!isAuthReady) {
    return <div className="p-4">Loading...</div>;
  }

  return user ? null : children;
};

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && !user) {
      router.replace("/en/login");
    }
  }, [isAuthReady, router, user]);

  if (!isAuthReady) {
    return <div className="p-4">Loading...</div>;
  }

  return user ? children : null;
};
