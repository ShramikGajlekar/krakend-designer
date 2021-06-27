/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ETCDMiddleware {
    availableETCDMachines: string;
    dialTimeOut?: number;
    dialKeepAlive?: number;
    timeOutPerReq?: number;
    certificate?: string;
    privKey?: string;
    caCert?: string;
}

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
