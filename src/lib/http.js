import axios from 'axios';
export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
    timeout: 10000,
})

http.interceptors.response.use(
    (res) => res,
    (err)=>{
        if (err.response) {
            console.error('API error', err.response.status, err.response.data)
        } else {
            console.error('Network error', err.message)
        }
        return Promise.reject(err)
    }
)