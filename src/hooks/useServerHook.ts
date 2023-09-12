import api from "../services/api";
import { cookies } from "next/headers";

export const useServerHook = () => {
  const cookieUser = cookies();
  const userCookie = cookieUser.get("user");
  const user = JSON.parse(userCookie?.value!);

  // Obtém os dados dos vereadores
  const fetchData = async () => {
    try {
      const userToken = cookieUser.get("token")?.value;
      const { data } = await api.get("/users", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return data;
    } catch (error: any) {
      console.error("Erro ao buscar dados das sessões:", error.message);
      return null;
    }
  };

  const getSessions = async () => {
    try {
      const userToken = cookieUser.get("token")?.value;
      const { data } = await api.get("/session", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return data;
    } catch (error: any) {
      console.error("Erro ao buscar dados das sessões:", error.message);
      return null;
    }
  };

  return { user, fetchData, getSessions };
};
