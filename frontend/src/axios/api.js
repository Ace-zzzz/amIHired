import axios from "axios";
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

// CREATE REUSABLE AXIOS INSTANCE
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type" : "application/json"
    }
});

api.interceptors.request.use(
    /**
     * RUN EVERY REQUEST TO
     * VALIDATE THE TOKEN 
     * THEN MODIFIED IT
     **/
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        if (config.data && !(config.data instanceof FormData)) {
            config.data = snakecaseKeys(config.data, { deep:true });
        }

        return config;
    },
    /**
     * RUN IF THERE'S AN
     * ERROR BEFORE PROCEEDING
     **/
    (error) => {
        return Promise.reject(error);
    }
);

// 3. RESPONSE INTERCEPTOR (The Translator)
api.interceptors.response.use(
    (response) => {
        // Use .includes to be safe with charsets
        const contentType = response.headers['content-type'] || '';
        
        if (response.data && contentType.includes('application/json')) {
            // { deep: true } ensures nested objects are also converted
            response.data = camelcaseKeys(response.data, { deep: true });
        }
        return response;
    },
    (error) => {
        const status = error.response?.status;

        // HANDLE UNAUTHENTICATED ACCESS (OR TOKEN EXPIRED)
        if (status === 401 || status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/login?session=expired";
        }

        return Promise.reject(error);
    }
);

export default api;