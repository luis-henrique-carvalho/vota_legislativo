import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../models/User";
import Cookies from "js-cookie";

// Defina constantes para os nomes dos cookies
const USER_COOKIE = "user";
const TOKEN_COOKIE = "token";

// Defina tipos para o contexto e os valores iniciais
interface UserContextData {
  isSigned: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Use as constantes de nomes de cookies
    const cookieUser = Cookies.get(USER_COOKIE);
    const cookieToken = Cookies.get(TOKEN_COOKIE);
   
    if (cookieUser && cookieToken) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);
  
  return (
    <UserContext.Provider
      value={{
        isSigned: Boolean(user),
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);

  return context;
}
