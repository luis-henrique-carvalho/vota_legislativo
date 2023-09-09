import { UserData } from "../models/RegisterAlderman";
import api from "../services/api";
import { ContainerType } from "../models/States";
import { useContextStates } from "../contexts/state";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { useToastMessage } from "./useToast";

export const useUserHook = () => {
  const { setContainer } = useContextStates();
  const { handleSignIn } = useAuth();
  const navigate = useNavigate();
  const { setToastMessage } = useToastMessage();

  const handleApiError = (error: any) => {
    console.error(error);
    if (error.response && error.response.data) {
      setToastMessage(error.response.data.message, "error");
    } else {
      setToastMessage("Ocorreu um erro ao efetuar a operação.", "error");
    }
  };

  const createUser = async (user: UserData) => {
    try {
      const resp = await api.post("/users", user);
      console.log(resp);
      setContainer(ContainerType.COUNCILORS_LIST);
      setToastMessage(
        `Usuário ${resp.data.name} criado com sucesso`,
        "success"
      );
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const getUsers = async () => {
    try {
      const resp = await api.get("/users");
      console.log(resp);
      return resp.data;
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

  const editUser = async (user: User) => {
    console.log(user);
    try {
      const resp = await api.put("/profile", user);
      console.log(resp);
      handleSignIn({ email: user.email, password: user.password });
      setToastMessage(
        `Usuário ${resp.data.name} Editado com sucesso`,
        "success"
      );
      navigate("/");
      return resp.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  return { createUser, getUsers, getUserById, deleteUserById, editUser };
};
