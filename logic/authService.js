import axios from 'axios';
import api from './api';

const BASE_URL = "http://localhost:8080/api/v1";
const login = async (email, password) => {
    try {
        const data = JSON.stringify({
            email,
            password
        });
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };

        const response = await axios.request(config);
        const { token, refreshToken, siteUser } = response.data;

        // Save tokens to local storage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('siteUser', JSON.stringify(siteUser));

        console.log(token);
        console.log(refreshToken);
        console.log(siteUser);

        return { token, refreshToken, siteUser };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to log in');
    }
};

const register = async ({ user }) => {
    try {
        const response = await api.post('/auth/register', { user });
        const { accessToken, refreshToken, siteUser } = response.data;

        // Save tokens to local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return { accessToken, refreshToken, siteUser };
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Failed to register');
    }
};



export { login, register };
