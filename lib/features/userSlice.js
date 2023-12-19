import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { loginUserRequest, loginUserSuccess, loginUserFailure, logoutUserRequest, logoutUserSuccess, logoutUserFailure } from '../actions';
import { login } from '@/logic/authService';
// export user actions
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';

export const loginUserAsync = (email, password) => async (dispatch) => {
    try {
        dispatch(loginUserRequest());
        await login(email, password)
            .then((response) => {
                console.log("Login response:", response)
                dispatch(setUser(response.siteUser))
                dispatch(loginUserSuccess(response))
                dispatch(updateUserInCookie())
                location.reload()
                return response;
            }).catch((error) => {
                console.log("Login error:", error)
                dispatch(loginUserFailure(error.message))
                return error;
            })
    } catch (error) {
        dispatch(loginUserFailure(error.message));
    }
}

export const logoutUserAsync = () => async (dispatch) => {
    try {
        dispatch(logoutUserRequest());
        dispatch(clearUser());
        dispatch(updateUserInCookie());
        dispatch(logoutUserSuccess());
    } catch (error) {
        dispatch(logoutUserFailure(error.message));
    }
}

const updateUserInCookie = () => (dispatch, getState) => {
    const state = getState().user;
    console.log("Updating user in cookie")
    Cookies.set('user', JSON.stringify(state));
};

const userSlice = createSlice({
    name: 'user',
    initialState: Cookies.get('user')
        ? { ...JSON.parse(Cookies.get('user')) }
        : {
            id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            role: '',
        },
    reducers: {
        // Define your reducer functions here
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.emailId;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phoneNumber = action.payload.phoneNumber;
            state.role = action.payload.role;
            console.log('User set to: ', state)
        },
        clearUser: (state) => {
            state.id = null;
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.phoneNumber = '';
            state.role = '';
            console.log('User cleared')
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
