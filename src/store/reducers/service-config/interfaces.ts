export interface HostInfo {
    disableSanitize: boolean;
    hostAddress: string;
}

export interface ModifyHostInfoPayload {
    disableSanitize: boolean;
    hostAddress: string;
    index: number;
}

export interface AvailableServiceHosts {
    serviceDiscovery: string;
    hosts: HostInfo[];
}

export interface HTTPServerSettings {
    port?: number;
    enableHTTPS?: boolean;
    publicKey?: string;
    privateKey?: string;
    httpReadTimeOut?: string;
    httpWriteTimeOut?: string;
    httpIdleTimeOut?: string;
    httpReadHeaderTimeOut?: string;
}

export interface TimeOutsAndTTL {
    backendTimeOut?: string;
    defaultCacheTTL?: string;
}

export interface Options {
    outputEncoding?: string;
    allowNonRest?: boolean;
}

export interface BotDetector {
    enable: boolean;
    whitelist: string[];
    blacklist: string[];
    patterns: string[];
    cacheSize: number;
}

export interface AdvHTTPClientTimeouts {
    idleConnectionTimeOut: string;
    responseHeaderTimeOut: string;
    expectContinueTimeOut: string;
}

export interface AdvHTTPClientConnections {
    maxIdleConn: number | undefined;
    maxIdleConnPerHost: number | undefined;
    disableKeepAlives: boolean;
    disableCompression: boolean;
}

export interface AdvHTTPClientDial {
    dialerTimeOut: string;
    dialerFallbackDelay: string;
    dialerKeepAlive: string;
}

export interface HTTPClientSettings {
    timeouts: AdvHTTPClientTimeouts;
    connections: AdvHTTPClientConnections;
    dialSettings: AdvHTTPClientDial;
}

export interface Cors {
    enableCors: boolean;
    allowedMethods: string[];
    allowedOrigins: string[];
    allowedHeaders: string[];
    exposeHeaders: string[];
    allowCredentials: boolean;
    maxAge: string;
}

export interface ServiceConfig {
    serviceName: string;
    availableHosts: AvailableServiceHosts;
    httpServerSettings?: HTTPServerSettings;
    timeoutsAndTTL?: TimeOutsAndTTL;
    options: Options;
    botDetector: BotDetector;
    httpClientSettings: HTTPClientSettings;
    cors: Cors;
}
