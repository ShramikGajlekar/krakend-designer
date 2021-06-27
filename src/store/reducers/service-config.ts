/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HostInfo {
    disableSanitize: boolean;
    hostAddress: string;
}

interface AvailableServiceHosts {
    serviceDiscovery: string;
    hosts: HostInfo[];
}

interface HTTPServerSettings {
    port?: number;
    enableHTTPS?: boolean;
    httpReadTimeOut?: number;
    httpWriteTimeOut?: number;
    httpIdleTimeOut?: number;
    httpReadHeaderTimeOut?: number;
}

interface TimeOutsAndTTL {
    backendTimeOut?: number;
    defaultCacheTTL?: number;
}

interface Options {
    outputEncoding?: string;
    allowNonRest?: boolean;
}

interface BotDetector {
    enable?: boolean;
    whitelist?: string[];
    blacklist?: string[];
    patterns?: string[];
    cacheSize?: number[];
}

interface AdvHTTPClientTimeouts {
    idleConnectionTimeOut?: number;
    responseHeaderTimeOut?: number;
    expectContinueTimeOut?: number;
}

interface AdvHTTPClientConnections {
    maxIdleConn?: number;
    maxIdleConnPerHost?: number;
    disableKeepAlives?: boolean;
    disableCompression?: boolean;
}

interface AdvHTTPClientDial {
    dialerTimeOut?: number;
    dialerFallbackDelay?: number;
    dialerKeepAlive?: number;
}

interface HTTPClientSettings {
    timeouts?: AdvHTTPClientTimeouts;
    connections?: AdvHTTPClientConnections;
    dialSettings?: AdvHTTPClientDial;
}

interface ServiceConfig {
    serviceName: string;
    availableHosts: AvailableServiceHosts;
    httpServerSettings?: HTTPServerSettings;
    timeoutsAndTTL?: TimeOutsAndTTL;
    options: Options;
    botDetector?: BotDetector;
    httpClientSettings?: HTTPClientSettings;
}

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
