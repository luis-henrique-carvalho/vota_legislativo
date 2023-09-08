// app/providers.tsx
"use client";
import "react-toastify/dist/ReactToastify.css";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UserProvider } from "@/contexts/UserContext";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="">
      <UserProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </UserProvider>
    </NextThemesProvider>
  );
}
