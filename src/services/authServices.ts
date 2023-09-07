import { UserLogin } from "@/models/User";
import { useRouter } from "next/navigation";
import { useToastMessage } from "@/hooks/useToast";
import api from "@/services/api";
import Cookie from "js-cookie";

const useSignIn = () => {
  const router = useRouter();
  const { setToastMessage } = useToastMessage();

  const signIn = async (user: UserLogin) => {
    try {
      const { data } = await api.post("/sessions", user);
      Cookie.set("token", data.token);
      Cookie.set("user", data.user);
      router.push("/alderman");
      setToastMessage(`Bem vindo ${data.user.name}`, "success");
    } catch (error: any) {
      setToastMessage(error.response.data.message, "error");
      throw error;
    }
  };

  const signOut = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login");
    setToastMessage(`Logout Realizado com sucesso`, "success");
  };

  return { signIn, signOut };
};

export default useSignIn;
