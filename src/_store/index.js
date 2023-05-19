import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { mobileReducer } from './mobile.slice';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './mobile.slice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        mobile: mobileReducer
    },
});