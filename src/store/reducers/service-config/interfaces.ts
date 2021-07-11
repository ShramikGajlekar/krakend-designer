export interface HostInfo {
    disableSanitize: boolean;
    hostAddress: string;
}

export interface AvailableServiceHosts {
    serviceDiscovery: string;
    hosts: HostInfo[];
}

export interface HTTPServerSettings {
    port?: number;
    enableHTTPS?: boolean;
    httpReadTimeOut?: number;
    httpWriteTimeOut?: number;
    httpIdleTimeOut?: number;
    httpReadHeaderTimeOut?: number;
}

export interface TimeOutsAndTTL {
    backendTimeOut?: number;
    defaultCacheTTL?: number;
}

export interface Options {
    outputEncoding?: string;
    allowNonRest?: boolean;
}

export interface BotDetector {
    enable?: boolean;
    whitelist?: string[];
    blacklist?: string[];
    patterns?: string[];
    cacheSize?: number[];
}

export interface AdvHTTPClientTimeouts {
    idleConnectionTimeOut?: number;
    responseHeaderTimeOut?: number;
    expectContinueTimeOut?: number;
}

export interface AdvHTTPClientConnections {
    maxIdleConn?: number;
    maxIdleConnPerHost?: number;
    disableKeepAlives?: boolean;
    disableCompression?: boolean;
}

export interface AdvHTTPClientDial {
    dialerTimeOut?: number;
    dialerFallbackDelay?: number;
    dialerKeepAlive?: number;
}

export interface HTTPClientSettings {
    timeouts?: AdvHTTPClientTimeouts;
    connections?: AdvHTTPClientConnections;
    dialSettings?: AdvHTTPClientDial;
}

export interface ServiceConfig {
    serviceName: string;
    availableHosts: AvailableServiceHosts;
    httpServerSettings?: HTTPServerSettings;
    timeoutsAndTTL?: TimeOutsAndTTL;
    options: Options;
    botDetector?: BotDetector;
    httpClientSettings?: HTTPClientSettings;
}
