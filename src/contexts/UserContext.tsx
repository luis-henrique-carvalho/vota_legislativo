"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../models/User";
import Cookies from "js-cookie";

interface userContexData {
  isSigned: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const userContex = createContext<userContexData>({} as userContexData);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    const cookieToken = Cookies.get("token");
   
    if (cookieUser && cookieToken) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);
  

  return (
    <userContex.Provider
      value={{
        isSigned: Boolean(user),
        user,
        setUser,
      }}
    >
      {children}
    </userContex.Provider>
  );
};

export function useUserContext() {
  const context = useContext(userContex);

  return context;
}
