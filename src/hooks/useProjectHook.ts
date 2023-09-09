
import api from "../services/api";
import { useToastMessage } from "./useToast";

export const useProjectHooks = () => {
  const { setToastMessage } = useToastMessage();

  const handleApiError = (error: any) => {
    console.error(error);
    const errorMessage = error.response
      ? error.response.data.message
      : "Ocorreu um erro ao efetuar a operação.";
    setToastMessage(errorMessage, "error");
  };

  const createProject = async (project: any) => {
    try {
      const resp = await api.post("/project", project);
      console.log(resp);
      setToastMessage(
        `Projeto ${resp.data.name} criado com sucesso`,
        "success"
      );

      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const projectDelete = async (id: string) => {
    try {
      const resp = await api.delete(`/project/${id}`);
      console.log(resp);
      setToastMessage(
        `Projeto ${resp.data.name} deletado com sucesso`,
        "success"
      );

      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  return { projectDelete, createProject };
};
