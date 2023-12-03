// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        console.log("Sending token")
        console.log(accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log("Sent token")
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // If the request fails due to an expired token, you can handle token refresh here
        try {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                console.log("Sending refresh token")
                const refreshToken = localStorage.getItem('refreshToken');
                console.log("Sent refresh token")
                const payload = {
                    "refreshToken": refreshToken
                }
                const response = await api.post('/auth/refresh', { payload });
                console.log("Got new access token")
                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                return api(originalRequest);
            }
        } catch (err) {
            console.log(err.message)
        }
        return Promise.reject(error);
    }
);

export default api;
