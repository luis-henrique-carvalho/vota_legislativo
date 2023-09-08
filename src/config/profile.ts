import api from "@/services/api";
import { cookies } from "next/headers";

export const getProfile = async () => {
  try {
    const token = cookies().get("token")?.value;

    if (token) {
      const { data } = await api.get(`/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } else {
      console.log("Token não encontrado.");
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
