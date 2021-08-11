/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import serviceConfigReducer from './reducers/service-config/reducer';

export const store = configureStore({
    reducer: {
        serviceConfig: serviceConfigReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
