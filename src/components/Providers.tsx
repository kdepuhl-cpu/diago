"use client";

import { ToastProvider } from "@/components/ui/Toast";
import { UserAuthProvider } from "@/lib/user/auth";
import PasswordGate from "@/components/PasswordGate";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PasswordGate>
      <ToastProvider>
        <UserAuthProvider>
          {children}
        </UserAuthProvider>
      </ToastProvider>
    </PasswordGate>
  );
}
