/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETCDMiddleware, ServiceDiscovery } from './interfaces';

const initialState: ServiceDiscovery = {
    etcdMiddleware: {
        enable: false,
        availableETCDMachines: [''],
    },
};

const serviceDiscAndHostsSlice = createSlice({
    name: 'serviceDiscAndHosts',
    initialState,
    reducers: {
        modifyETCDMiddleware(state, action: PayloadAction<ETCDMiddleware>) {
            state.etcdMiddleware = action.payload;
        },
        addETCDMachines(state, action: PayloadAction<string>) {
            state.etcdMiddleware.availableETCDMachines?.push(action.payload);
        },
        removeETCDMachines(state, action: PayloadAction<number>) {
            state.etcdMiddleware.availableETCDMachines?.splice(action.payload, 1);
        },
    },
});
export const { modifyETCDMiddleware, addETCDMachines, removeETCDMachines } = serviceDiscAndHostsSlice.actions;
export default serviceDiscAndHostsSlice.reducer;
