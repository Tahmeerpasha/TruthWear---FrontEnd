// api.js
require('dotenv').config();
import axios from 'axios';
import jwt from 'jsonwebtoken';
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
api.defaults.headers.common['Content-Type'] = "application/json"
api.defaults.headers.common['Accept'] = "application/json"

api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenExpired = isTokenExpired(accessToken);
    if (tokenExpired) {
        const refresh = localStorage.getItem('refreshToken')
        await refreshTokenApi(refresh)
    }

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});


export default api;


const decodeToken = (token) => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const isTokenExpired = (token) => {
    const decodedToken = decodeToken(token);

    if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    }

    return false;
};

const refreshTokenApi = async (refreshToken) => {
    try {
        // Make a request to the server to refresh the token
        const response = await api.post('/auth/refresh', { refresh_token: refreshToken });

        if (response.status === 200 || response.status === 201) {
            const newToken = await response.data;
            console.log(newToken);
            localStorage.setItem('accessToken', newToken.access_token);
            window.location.reload()
        } else {
            // Handle the case where the refresh request fails
            console.log("Refresh token failed", response.data)
        }

    } catch (error) {
        console.error('Error refreshing token:', error);
    }
};

