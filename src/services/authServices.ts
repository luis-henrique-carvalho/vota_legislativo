import { User } from "./../models/User";
import { UserLogin } from "@/models/User";
import { useRouter } from "next/navigation";
import { useToastMessage } from "@/hooks/useToast";
import api from "@/services/api";
import Cookie from "js-cookie";
import { useUserContext } from "@/contexts/UserContext";

const useSignIn = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

  const { setToastMessage } = useToastMessage();

  const signIn = async (user: UserLogin) => {
    try {
      const { data } = await api.post("/sessions", user);
      const newUser: User = data.user;

      // Serializa o objeto de usuário para uma string JSON ao definir o cookie
      Cookie.set("token", data.token);
      Cookie.set("user", JSON.stringify(newUser));

      router.push("/alderman");
      setUser(data.user);
      setToastMessage(`Bem vindo ${newUser.name}`, "success");
    } catch (error: any) {
      setToastMessage(error.response.data.message, "error");
      throw error;
    }
  };

  const signOut = () => {
    // Remove os cookies ao fazer logout
    Cookie.remove("token");
    Cookie.remove("user");
    setUser(null);
    router.push("/login");
    setToastMessage(`Logout Realizado com sucesso`, "success");
  };

  return { signIn, signOut };
};

export default useSignIn;
