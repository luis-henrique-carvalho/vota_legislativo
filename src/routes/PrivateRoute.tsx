"use client";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { APP_ROUTES } from "./app.routes";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const { isSigned } = useAuth();

  useEffect(() => {
    if (!isSigned) {
      push(APP_ROUTES.public.login);
    }
  }, [isSigned, push]);

  return (
    <>
      {!isSigned && null}
      {!isSigned && children}
    </>
  );
};

export default PrivateRoute;
