/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import serviceConfigReducer from './reducers/service-config/reducer';
import serviceDiscoveryReducer from './reducers/service-discovery/reducer';
import endpointReducer from './reducers/endpoints/reducer';
import securityOptionsReducer from './reducers/security-options/reducer';
export const store = configureStore({
    reducer: {
        serviceConfig: serviceConfigReducer,
        serviceDiscovery: serviceDiscoveryReducer,
        endpoints: endpointReducer,
        securityOptions: securityOptionsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
