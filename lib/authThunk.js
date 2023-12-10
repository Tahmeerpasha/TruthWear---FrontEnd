// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTokens, clearTokens } from './features/authSlice';
import { BASE_URL } from '@/logic/constants';

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (refreshToken, { dispatch, getState }) => {
        try {
            // Send a request to the refresh token endpoint on your backend
            const response = await fetch(`${BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const { accessToken, refreshToken } = await response.json();
                dispatch(setTokens({ accessToken, refreshToken }));
            } else {
                // Handle refresh failure (e.g., logout user)
                dispatch(clearTokens());
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Handle refresh failure (e.g., logout user)
            dispatch(clearTokens());
        }
    }
);
