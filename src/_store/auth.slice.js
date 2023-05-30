import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { alertActions } from '_store';
import { history, fetchWrapper } from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createReducers() {
    return {
        setAuth
    };

    function setAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {
    // const baseUrl = `${process.env.FRONTEND_URL_PORT}/users`;

    return {
        login: login(),
        logout: logout(),
        forgot: forgot(),
        reset: reset()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async function ({ email, password }, { dispatch }) {
                dispatch(alertActions.clear());
                try {
                    const user = await fetchWrapper.post(`https://iship.herokuapp.com/login`, { email, password });

                    // set auth user in redux state
                    dispatch(authActions.setAuth(user));

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth', JSON.stringify(user));

                    // get return url from location state or default to home page
                    // const { from } = history.location.state || { from: { pathname: '/' } };
                    // history.navigate(from);
                    dispatch(alertActions.success({ message: 'Login successful', showAfterRedirect: true }));
                } catch (error) {
                    dispatch(alertActions.error(error));
                }
            }
        );
    }
    function forgot() {
        return createAsyncThunk(
            `${name}/forgot`,
            async function ({ email }, { dispatch }) {
                dispatch(alertActions.clear());
                try {
                    const user = await fetchWrapper.post(`https://iship.herokuapp.com/forgot-password`, { email });
                    console.log(user);

                    dispatch(alertActions.success(`Check your email address for the password reset link.`));

                } catch (error) {
                    dispatch(alertActions.error(error));
                }
            }
        );
    }
    function reset() {
        return createAsyncThunk(
            `${name}/reset`,
            async function ({ password, auth }, { dispatch }) {
                dispatch(alertActions.clear());
                try {
                    console.log(password, auth);
                    const user = await fetchWrapper.post(`https://iship.herokuapp.com/reset-password`, { password },auth);
                    console.log(user);

                    dispatch(alertActions.success(`Password reset successfully`));

                } catch (error) {
                    dispatch(alertActions.error(error));
                }
            }
        );
    }

    function logout() {
        return createAsyncThunk(
            `${name}/logout`,
            function (arg, { dispatch }) {
                dispatch(authActions.setAuth(null));
                localStorage.removeItem('auth');
                history.navigate('/account/login');
            }
        );
    }
}