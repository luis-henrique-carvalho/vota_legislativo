import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: 'https://apivotacao1.premiumcompanytech.com.br',
});

// Adicione um interceptor para todas as solicitações
api.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Obtenha o token armazenado nos cookies ou de onde quer que você o tenha

  if (token) {
    // Se o token existir, adicione o cabeçalho de autorização "Bearer" automaticamente
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Lide com erros de solicitação aqui, se necessário
  return Promise.reject(error);
});

export default api;
