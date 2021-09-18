/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import serviceConfigReducer from './reducers/service-config/reducer';
import serviceDiscoveryReducer from './reducers/service-discovery/reducer';
import endpointReducer from './reducers/endpoints/reducer';
export const store = configureStore({
    reducer: {
        serviceConfig: serviceConfigReducer,
        serviceDiscovery: serviceDiscoveryReducer,
        endpoints: endpointReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
