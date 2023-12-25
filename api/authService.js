import axios from 'axios';
import api from './api';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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

const logout = () => {
    try {
        console.log("Logging out")
        // await api.post('/auth/logout');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('siteUser');

        location.reload()
    } catch (error) {
        console.error('Logout failed:', error);
        throw new Error('Failed to logout');
    }
}
const signUp = async (formData) => {

    try {
        console.log("Handling sign up...");
        const response = await axios.post(`${BASE_URL}/auth/register`, formData);
        const data = await response.data;
        if (response.status === 200 || response.status === 201) {
            return { message: "Sign Up Successful! Please login to continue.", data: data };
        }
        console.log("Sign up Successful:");
    } catch (error) {
        console.error("Sign up failed:", error.message);
    }
};

export { login, register, logout, signUp };
