import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/', // Reemplaza esto con la URL base de tu API
    timeout: 1000, // Tiempo de espera en milisegundos
    headers: { 'Content-Type': 'application/json' },
});

export { axiosInstance }