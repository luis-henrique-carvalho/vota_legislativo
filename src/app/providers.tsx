// app/providers.tsx
"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/services/checkIsPublicRoute";
import PrivateRoute from "@/routes/PrivateRoute";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isPublicPage = checkIsPublicRoute(pathName);

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="">
        {isPublicPage && children}
        {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
        <ToastContainer />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
