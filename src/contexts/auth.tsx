"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import api from "../services/api";
import { User, UserLogin } from "../models/User";
import { useToastMessage } from "../hooks/useToast";
import useSignIn from "@/services/authServices";

interface AuthContextData {
  isSigned: boolean;
  user: User | null;
  handleSignIn: (user: UserLogin) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { setToastMessage } = useToastMessage();
  const { signIn } = useSignIn();

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    const storageToken = localStorage.getItem("token");

    if (storageUser && storageToken) {
      api.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
      setUser(JSON.parse(storageUser));
    }
  }, []);

  async function handleSignIn(user: UserLogin) {
    try {
      const response = await signIn(user);

      if (response) {
        localStorage.setItem("token", response.token);

        localStorage.setItem("user", JSON.stringify(response.user));

        setUser(response.user as User);

        api.defaults.headers["Authorization"] = `Bearer ${response.token}`;

        router.push("/");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setToastMessage(error.response.data.message, "error");
      } else {
        setToastMessage("Ocorreu um erro ao efetuar o login.", "error");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
    setToastMessage("Logout realizado com sucesso", "success");
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned: Boolean(user),
        user,
        handleSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
