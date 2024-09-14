import axios from "axios";
import store from "../redux/store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/", // Reemplaza esto con la URL base de tu API
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: { "Content-Type": "application/json" },
});
// Configurar el interceptor para añadir el token a las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      // Asegúrate de que config.headers esté correctamente tipado
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { axiosInstance };
