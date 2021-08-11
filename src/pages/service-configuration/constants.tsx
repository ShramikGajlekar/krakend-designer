export const staticAddressRolution = 'static_address_resolution';
export const dnsSrv = 'dns_srv';
export const etcd = 'etcd';
export const customServiceDiscovery = 'custom_service_discovery';

export const changeTypeHostInfoAddress = 'host-info-address-changed';
export const changeTypeHostInfoSanitize = 'host-info-sanitization-changed';
export const changeTypeBackendTimeOut = 'timeouts-ttl-backend-timeout-change';
export const changeTypeDefaultCacheTTL = 'timeouts-ttl-default-cache-ttl-change';

export const changeTypeHTTPServerSettingPort = 'http-server-settings-port-changed';
export const changeTypeHTTPServerSettingEnableHTTPS = 'http-server-settings-enable-https-changed';
export const changeTypeHTTPServerSettingPublicKey = 'http-server-settings-public-key-changed';
export const changeTypeHTTPServerSettingPrivateKey = 'http-server-settings-private-key-changed';
export const changeTypeHTTPServerSettingReadTimeout = 'http-server-settings-read-timeout-changed';
export const changeTypeHTTPServerSettingWriteTimeout = 'http-server-settings-write-timeout-changed';
export const changeTypeHTTPServerSettingIdleTimeout = 'http-server-settings-idle-timeout-changed';
export const changeTypeHTTPServerSettingReadHeaderTimeout = 'http-server-settings-read-header-timeout-changed';

export const changeTypeOptionsEncoding = 'option-encoding-changed';
export const changeTypeOptionsAllowNonRestResourceNaming = 'option-allow-non-rest-resource-naming-changed';

export const changeTypeBotDetectorEnable = 'bot-detector-enable-state-changed';
export const changeTypeBotDetectorWhiteList = 'bot-detector-whitleist-changed';
export const changeTypeBotDetectorBlackList = 'bot-detector-blacklist-changed';
export const changeTypeBotDetectorPatterns = 'bot-detector-patterns-changed';
export const changeTypeBotDetectorCacheSize = 'bot-detector-cache-size-changed';

export const changeTypeCorsAllowedMethods = 'cors-allowed-methods';
export const changeTypeCorsAllowedOrigins = 'cors-allowed-origins';
export const changeTypeCorsAllowedHeaders = 'cors-allowed-headers';
export const changeTypeCorsExposedHeaders = 'cors-exposed-headers';
export const changeTypeCorsMaxAge = 'cors-max-age';
export const changeTypeCorsAllowCredentials = 'cors-allowed-credentials';
export const changeTypeCorsEnableCors = 'cors-enable-state-changed';

export const changeTypeHTTPClientIdleConnectionTimeout = 'http-server-client-idle-connection-timeout-changed';
export const changeTypeHTTPClientResponseHeaderTimeOut = 'http-server-client-response-header-timeout-changed';
export const changeTypeHTTPClientExpectContinueTimeOut = 'http-server-client-exchange-continue-timeout-changed';
export const changeTypeHTTPClientMaxIdleConnections = 'http-server-client-max-idle-connection-changed';
export const changeTypeHTTPClientMaxIdleConnectionsPerHost = 'http-server-client-max-idle-connection-per-host-changed';
export const changeTypeHTTPClientDisableKeepAlives = 'http-server-client-disable-keep-alives-changed';
export const changeTypeHTTPClientDisableCompression = 'http-server-client-disable-compression-changed';
export const changeTypeHTTPClientDialerTimeOut = 'http-server-client-dialer-timeout-changed';
export const changeTypeHTTPClientDialerFallbackDelay = 'http-server-client-dialer-fallback-changed';
export const changeTypeHTTPClientDialerKeepAlive = 'http-server-client-dialer-keep-alives-changed';

export const encodingOptions: string[][] = [
    ['JSON', 'json'],
    ['Negotiate Content', 'negotiate'],
    ['String (text/plain)', 'string'],
    ['No-op (just-proxy)', 'no-op'],
];

export const allowedMethods: string[][] = [
    ['GET', 'GET'],
    ['HEAD', 'HEAD'],
    ['PUT', 'PUT'],
    ['POST', 'POST'],
    ['PATCH', 'PATCH'],
    ['DELETE', 'DELETE'],
    ['OPTIONS', 'OPTIONS'],
    ['TRACE', 'TRACE'],
    ['CONNECT', 'CONNECT'],
];
