/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    BotDetector,
    Cors,
    HostInfo,
    HTTPClientSettings,
    HTTPServerSettings,
    ModifyHostInfoPayload,
    Options,
    ServiceConfig,
    TimeOutsAndTTL,
} from './interfaces';

const initialState: ServiceConfig = {
    serviceName: '',
    availableHosts: {
        serviceDiscovery: '',
        hosts: [
            {
                disableSanitize: false,
                hostAddress: '',
            },
        ],
    },
    options: {
        outputEncoding: '',
        allowNonRest: false,
    },
    botDetector: {
        enable: false,
        whitelist: [''],
        blacklist: [''],
        cacheSize: 0,
        patterns: [''],
    },
    cors: {
        enableCors: false,
        allowCredentials: false,
        allowedHeaders: [''],
        allowedOrigins: [''],
        allowedMethods: [],
        exposeHeaders: [''],
        maxAge: '',
    },
    httpClientSettings: {
        timeouts: {
            idleConnectionTimeOut: '',
            responseHeaderTimeOut: '',
            expectContinueTimeOut: '',
        },
        connections: {
            maxIdleConn: undefined,
            maxIdleConnPerHost: undefined,
            disableCompression: false,
            disableKeepAlives: false,
        },
        dialSettings: {
            dialerTimeOut: '',
            dialerFallbackDelay: '',
            dialerKeepAlive: '',
        },
    },
};

const serviceConfSlice = createSlice({
    name: 'serviceConfig',
    initialState,
    reducers: {
        addHostInfo(state, action: PayloadAction<HostInfo>) {
            state.availableHosts.hosts.push(action.payload);
        },
        modifyHostInfo(state, action: PayloadAction<ModifyHostInfoPayload>) {
            state.availableHosts.hosts[action.payload.index] = {
                hostAddress: action.payload.hostAddress,
                disableSanitize: action.payload.disableSanitize,
            };
        },
        removeHostInfo(state, action: PayloadAction<number>) {
            state.availableHosts.hosts.splice(action.payload, 1);
        },
        modifyAvailableHostsServiceDiscovery(state, action: PayloadAction<string>) {
            state.availableHosts.serviceDiscovery = action.payload;
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
        // Options
        modifyOptions(state, action: PayloadAction<Options>) {
            state.options = action.payload;
        },
        // Bot
        addBotDetectorWhiteListInfo(state, action: PayloadAction<string>) {
            state.botDetector?.whitelist?.push(action.payload);
        },
        removeBotDetectorWhiteListInfo(state, action: PayloadAction<number>) {
            state.botDetector?.whitelist?.splice(action.payload, 1);
        },
        addBotDetectorBlackListInfo(state, action: PayloadAction<string>) {
            state.botDetector?.blacklist?.push(action.payload);
        },
        removeBotDetectorBlackListInfo(state, action: PayloadAction<number>) {
            state.botDetector?.blacklist?.splice(action.payload, 1);
        },
        addBotDetectorPatternsInfo(state, action: PayloadAction<string>) {
            state.botDetector?.patterns?.push(action.payload);
        },
        removeBotDetectorPatternsInfo(state, action: PayloadAction<number>) {
            state.botDetector?.patterns?.splice(action.payload, 1);
        },
        modifyBotDetector(state, action: PayloadAction<BotDetector>) {
            state.botDetector = action.payload;
        },
        // Cors
        modifyCorsConfig(state, action: PayloadAction<Cors>) {
            state.cors = action.payload;
        },
        addCorsAllowedMethods(state, action: PayloadAction<string>) {
            state.cors.allowedMethods.push(action.payload);
        },
        removeCorsAllowedMethods(state, action: PayloadAction<number>) {
            state.cors.allowedMethods.splice(action.payload, 1);
        },
        addCorsAllowedOrigins(state, action: PayloadAction<string>) {
            state.cors.allowedOrigins.push(action.payload);
        },
        removeCorsAllowedOrigins(state, action: PayloadAction<number>) {
            state.cors.allowedOrigins.splice(action.payload, 1);
        },
        addCorsAllowedHeaders(state, action: PayloadAction<string>) {
            state.cors.allowedHeaders.push(action.payload);
        },
        removeCorsAllowedHeaders(state, action: PayloadAction<number>) {
            state.cors.allowedHeaders.splice(action.payload, 1);
        },
        addCorsExposeHeaders(state, action: PayloadAction<string>) {
            state.cors.exposeHeaders.push(action.payload);
        },
        removeCorsExposeHeaders(state, action: PayloadAction<number>) {
            state.cors.exposeHeaders.splice(action.payload, 1);
        },
        // HTTPCLient
        modifyHTTPClientSettings(state, action: PayloadAction<HTTPClientSettings>) {
            state.httpClientSettings = action.payload;
        },
    },
});

export const {
    addHostInfo,
    modifyHostInfo,
    removeHostInfo,
    modifyServiceName,
    modifyAvailableHostsServiceDiscovery,
    modifyHTTPServerSettings,
    modifyTimeoutsAndTTL,
    modifyOptions,
    modifyBotDetector,
    addBotDetectorWhiteListInfo,
    removeBotDetectorWhiteListInfo,
    addBotDetectorBlackListInfo,
    removeBotDetectorBlackListInfo,
    addBotDetectorPatternsInfo,
    removeBotDetectorPatternsInfo,
    modifyCorsConfig,
    addCorsAllowedMethods,
    removeCorsAllowedMethods,
    addCorsAllowedOrigins,
    removeCorsAllowedOrigins,
    addCorsAllowedHeaders,
    removeCorsAllowedHeaders,
    addCorsExposeHeaders,
    removeCorsExposeHeaders,
    modifyHTTPClientSettings,
} = serviceConfSlice.actions;

export default serviceConfSlice.reducer;
