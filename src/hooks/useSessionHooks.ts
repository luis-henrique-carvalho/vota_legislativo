import api from "../services/api";


import { useToastMessage } from "../hooks/useToast";
import { SessionData } from "@/models/Session";

export const useSessionHooks = () => {
 
  const { setToastMessage } = useToastMessage();

  const handleApiError = (error: any) => {
    console.error(error);
    if (error.response && error.response.data) {
      setToastMessage(error.response.data.message, "error");
    } else {
      setToastMessage("Ocorreu um erro ao efetuar a operação.", "error");
    }
  };

  const createSession = async (session: SessionData) => {
    try {
      const resp = await api.post("/session", session);
      console.log(resp);
      setToastMessage(`sessão ${resp.data.name} Criada com suceeso`, "success");
   
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const getSessions = async () => {
    try {
      const resp = await api.get("/session");
      console.log(resp);
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const sessionDelete = async (id: string) => {
    try {
      const resp = await api.delete(`/session/${id}`);
      console.log(resp);
      setToastMessage(`Sessão ${resp.data.name} deletada com suceeso`, "success");
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  return { createSession, getSessions, sessionDelete };
};
