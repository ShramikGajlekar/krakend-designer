/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    BotDetector,
    HostInfo,
    HTTPClientSettings,
    HTTPServerSettings,
    Options,
    ServiceConfig,
    TimeOutsAndTTL,
} from './interfaces';

const initialState: ServiceConfig = {
    serviceName: '',
    availableHosts: {
        serviceDiscovery: '',
        hosts: [],
    },
    options: {
        outputEncoding: '',
        allowNonRest: false,
    },
};

const serviceConfSlice = createSlice({
    name: 'serviceConfig',
    initialState,
    reducers: {
        addHostInfo(state, action: PayloadAction<HostInfo>) {
            state.availableHosts.hosts.push(action.payload);
        },
        modifyServiceName(state, action: PayloadAction<string>) {
            state.serviceName = action.payload;
        },
        modifyHTTPServerSettings(state, action: PayloadAction<HTTPServerSettings>) {
            state.httpServerSettings = action.payload;
        },
        modifyTimeoutsAndTTL(state, action: PayloadAction<TimeOutsAndTTL>) {
            state.timeoutsAndTTL = action.payload;
        },
        modifyOptions(state, action: PayloadAction<Options>) {
            state.options = action.payload;
        },
        modifyBotDetector(state, action: PayloadAction<BotDetector>) {
            state.botDetector = action.payload;
        },
        modifyHTTPClientSettings(state, action: PayloadAction<HTTPClientSettings>) {
            state.httpClientSettings = action.payload;
        },
    },
});

export const {
    addHostInfo,
    modifyServiceName,
    modifyHTTPServerSettings,
    modifyTimeoutsAndTTL,
    modifyOptions,
    modifyBotDetector,
    modifyHTTPClientSettings,
} = serviceConfSlice.actions;

export default serviceConfSlice.reducer;
