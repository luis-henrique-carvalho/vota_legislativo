import { useState } from 'react';
import api from "../services/api";
import { useToastMessage } from "../hooks/useToast";

export const useProfilesHook = () => {
  const { setToastMessage } = useToastMessage();
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    try {
      setLoading(true); // Inicia o estado de loading
      const resp = await api.get("/profile");
      setLoading(false); // Finaliza o estado de loading
      return resp.data;
    } catch (error) {
      setLoading(false); // Finaliza o estado de loading em caso de erro
      handleApiError(error);
    }
  };

  const handleApiError = (error: any) => {
    console.error(error);
    if (error.response && error.response.data) {
      setToastMessage(error.response.data.message, "error");
    } else {
      setToastMessage("Ocorreu um erro ao efetuar a operação.", "error");
    }
  };

  return { getProfile, loading };
};
