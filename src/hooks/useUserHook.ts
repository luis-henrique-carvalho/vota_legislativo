import { User } from "@/models/User";
import api from "../services/api";
import { useToastMessage } from "./useToast";

export const useUserHook = () => {
  const { setToastMessage } = useToastMessage();

  const handleApiError = (error: any) => {
    console.error(error);
    if (error.response && error.response.data) {
      setToastMessage(error.response.data.message, "error");
    } else {
      setToastMessage("Ocorreu um erro ao efetuar a operação.", "error");
    }
  };

  const createUser = async (user: any) => {
    try {
      const resp = await api.post("/users", user);
      console.log(resp);
      setToastMessage(
        `Usuário ${resp.data.name} criado com sucesso`,
        "success"
      );
      return resp.data;
    } catch (error) {
      console.error("failed to create user", error);
      handleApiError(error);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await api.get("/users");
      return data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const resp = await api.get(`/users/${id}`);
      console.log(resp);
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteUserById = async (id: string) => {
    try {
      const resp = await api.delete(`/users/${id}`);
      console.log(resp);
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const editUser = async (user: User, id: string) => {
    try {
      const resp = await api.put(`/profile/${id}`, user);
      setToastMessage(
        `Usuário ${resp.data.name} Editado com sucesso`,
        "success"
      );
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  return { createUser, getUsers, getUserById, deleteUserById, editUser };
};
