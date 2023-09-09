import { useState } from "react";
import api from "../services/api";
import { useToastMessage } from "./useToast";

export const useProjectHooks = () => {
  const [loading, setLoading] = useState(false);
  const { setToastMessage } = useToastMessage();

  const handleApiError = (error: any) => {
    console.error(error);
    if (error.response && error.response.data) {
      setToastMessage(error.response.data.message, "error");
    } else {
      setToastMessage("Ocorreu um erro ao efetuar a operação.", "error");
    }
  };

  const createProject = async (projetct: any) => {
    try {
      setLoading(true);
      const resp = await api.post(`/project`, projetct);
      console.log(resp);
      setToastMessage(
        `Projeto ${resp.data.name} criado com sucesso`,
        "success"
      );
      setLoading(false); // Certifique-se de chamar setLoading(false) aqui em caso de sucesso
      return resp.data;
    } catch (error) {
      setLoading(false); // Certifique-se de chamar setLoading(false) aqui em caso de erro
      handleApiError(error);
    }
  };

  const projectDelete = async (id: string) => {
    try {
      setLoading(true);
      const resp = await api.delete(`/project/${id}`);
      console.log(resp);
      setToastMessage(
        `Projeto ${resp.data.name} deletada com suceeso`,
        "success"
      );
      setLoading(false);
      return resp.data;
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  return { projectDelete, createProject, loading };
};
