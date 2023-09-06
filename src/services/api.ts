import axios from "axios";

const api = axios.create({
    baseURL: 'https://apivotacao1.premiumcompanytech.com.br',
});

export default api;
