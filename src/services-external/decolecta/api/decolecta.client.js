import axios from "axios";

const decolectaClient = axios.create({
    baseURL: "https://api.decolecta.com/v1",
    timeout: 10000,
});

decolectaClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${process.env.DECOLECTA_API_KEY}`;
    return config;
});

export default decolectaClient;
