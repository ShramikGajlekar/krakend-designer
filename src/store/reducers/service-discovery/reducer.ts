/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETCDMiddleware } from './interfaces';

const initialState: ETCDMiddleware = {
    availableETCDMachines: '',
};

const serviceDiscAndHostsSlice = createSlice({
    name: 'serviceDiscAndHosts',
    initialState,
    reducers: {
        modifyETCDMiddleware(state, action: PayloadAction<ETCDMiddleware>) {
            state = action.payload;
        },
    },
});
export const { modifyETCDMiddleware } = serviceDiscAndHostsSlice.actions;
export default serviceDiscAndHostsSlice.reducer;
