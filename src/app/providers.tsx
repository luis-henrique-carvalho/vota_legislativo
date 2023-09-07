// app/providers.tsx
"use client";
import "react-toastify/dist/ReactToastify.css";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="">
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  );
}
