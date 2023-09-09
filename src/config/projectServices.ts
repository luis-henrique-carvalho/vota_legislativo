// import api from "@/services/api";
// import { useToastMessage } from "@/hooks/useToast";

// const { setToastMessage } = useToastMessage();

// // export const createProject = async (project: any) => {
// //   try {
// //     const { data } = await api.post(`/project`, project);
// //     console.log(data);
// //     setToastMessage(`Projeto criado com suceeso `, "success");
// //     return data;
// //   } catch (error: any) {
// //     setToastMessage(error.response.data.message, "error");
// //     console.log(error);
// //     return null;
// //   }
// // };


// export const createProject = async (project: any) => {
//   return await api.post(`/project`, project);
//   try {

//     const { data } = await api.post(`/project`, project);
//     console.log(data);
//     setToastMessage(`Projeto criado com suceeso `, "success");
//     return data;
//   } catch (error: any) {
//     setToastMessage(error.response.data.message, "error");
//     console.log(error);
//     return null;
//   }
// };