import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { mobileReducer } from './mobile.slice';
import { locationReducer } from './location.slice';
import { orderReducer } from './order.slice';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './mobile.slice';
export * from './location.slice';
export * from './order.slice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        mobile: mobileReducer,
        location: locationReducer,
        order: orderReducer
    },
});