export const changeEndpointURI = 'changeEndpointURI';
export const changeEndpointMethod = 'changeEndpointMethod';
export const changeEndpointQueryParams = 'changeEndpointQueryParams';

export const changeTypeRateLimitEnable = 'changeTypeRateLimitEnable';
export const changeTypeRateLimit = 'changeTypeRateLimit';
export const changeTypeRateLimitDefaultUserQuota = 'changeTypeRateLimitDefaultUserQuota';

export const changeTypeCustomCombiner = 'changeTypeCustomCombiner';

export const changeTypeHeader = 'changeTypeHeader';
export const changeTypeConcurrentCalls = 'changeTypeConcurrentCalls';

export const changeTypeTimeOut = 'changeTypeTimeOut';
export const changeTypeCacheTTL = 'changeTypeCacheTTL';

export const changeTypeEnableHTTPSecure = 'changeTypeEnableHTTPSecure';
export const changeTypeAllowedHosts = 'changeTypeAllowedHosts';
export const changeTypeForceSSL = 'changeTypeForceSSL';
export const changeTypeSSLDomain = 'changeTypeSSLDomain';
export const changeTypeSSLPort = 'changeTypeSSLPort';
export const changeTypeSSLCert = 'changeTypeSSLCert';
export const changeTypeSSLPrivKey = 'changeTypeSSLPrivKey';
export const changeTypeSSLHeaderKey = 'changeTypeSSLHeaderKey';
export const changeTypeSSLHeaderValue = 'changeTypeSSLHeaderValue';
export const changeTypeSSLMaxAge = 'changeTypeSSLMaxAge';
export const changeTypeSSLIncludeSubdomains = 'changeTypeSSLIncludeSubdomains';
export const changeTypeSSLEnableClickJackingProtection = 'changeTypeSSLEnableClickJackingProtection';
export const changeTypeSSLPublicKeyPins = 'changeTypeSSLPublicKeyPins';
export const changeTypeSSLMimeSniffPrevention = 'changeTypeSSLMimeSniffPrevention';
export const changeTypeSSLXSSFilterEnable = 'changeTypeSSLXSSFilterEnable';
export const changeTypeSSLContentSecurityPolicy = 'changeTypeSSLContentSecurityPolicy';

export const changeTypeJWTValidationEnable = 'changeTypeJWTValidationEnable';
export const changeTypeJWTValidationAlgorithm = 'changeTypeJWTValidationAlgorithm';
export const changeTypeJWTValidationJWKURI = 'changeTypeJWTValidationJWKURI';
export const changeTypeJWTValidationScopes = 'changeTypeJWTValidationScopes';
export const changeTypeJWTValidationMatcher = 'changeTypeJWTValidationMatcher';
export const changeTypeJWTValidationScopesKey = 'changeTypeJWTValidationScopesKey';
export const changeTypeJWTValidationIssuer = 'changeTypeJWTValidationIssuer';
export const changeTypeJWTValidationAudience = 'changeTypeJWTValidationAudience';
export const changeTypeJWTValidationRoles = 'changeTypeJWTValidationRoles';
export const changeTypeJWTValidationRolesKey = 'changeTypeJWTValidationRolesKey';
export const changeTypeJWTValidationCookieName = 'changeTypeJWTValidationCookieName';
export const changeTypeJWTValidationFingerPrints = 'changeTypeJWTValidationFingerPrints';
export const changeTypeJWTValidationEnableCustomCipherSuites = 'changeTypeJWTValidationEnableCustomCipherSuites';
export const changeTypeJWTValidationCustomCipherSuites = 'changeTypeJWTValidationCustomCipherSuites';
export const changeTypeJWTValidationEnableCaching = 'changeTypeJWTValidationEnableCaching';
export const changeTypeJWTValidationDisableJWKSecurity = 'changeTypeJWTValidationDisableJWKSecurity';

export const changeTypeJWTSigningEnable = 'changeTypeJWTSigningEnable';
export const changeTypeJWTSigningJWKURI = 'changeTypeJWTSigningJWKURI';
export const changeTypeJWTSigningAlgorithm = 'changeTypeJWTSigningAlgorithm';
export const changeTypeJWTSigningKeysToSign = 'changeTypeJWTSigningKeysToSign';
export const changeTypeJWTSigningKeyID = 'changeTypeJWTSigningKeyID';
export const changeTypeJWTSigningEnableCustomCipherSuite = 'changeTypeJWTSigningEnableCustomCipherSuite';
export const changeTypeJWTSigningCustomCipherSuite = 'changeTypeJWTSigningCustomCipherSuite';
export const changeTypeJWTSigningFingerprints = 'changeTypeJWTSigningFingerprints';
export const changeTypeJWTSigningFullSerialization = 'changeTypeJWTSigningFullSerialization';
export const changeTypeJWTSigningDisableJWKSecurity = 'changeTypeJWTSigningDisableJWKSecurity';

export const matcher: string[][] = [
    ['All', 'All'],
    ['Any', 'Any'],
    ['None', 'None'],
];

export const allowedCustomCiphers: string[][] = [
    ['TLS_RSA_WITH_RC4_128_SHA', 'TLS_RSA_WITH_RC4_128_SHA'],
    ['TLS_RSA_WITH_3DES_EDE_CBC_SHA', 'TLS_RSA_WITH_3DES_EDE_CBC_SHA'],
    ['TLS_RSA_WITH_AES_128_CBC_SHA', 'TLS_RSA_WITH_AES_128_CBC_SHA'],
    ['TLS_RSA_WITH_AES_256_CBC_SHA', 'TLS_RSA_WITH_AES_256_CBC_SHA'],
    ['TLS_RSA_WITH_AES_128_CBC_SHA256', 'TLS_RSA_WITH_AES_128_CBC_SHA256'],
    ['TLS_RSA_WITH_AES_128_GCM_SHA256', 'TLS_RSA_WITH_AES_128_GCM_SHA256'],
    ['TLS_RSA_WITH_AES_256_GCM_SHA384', 'TLS_RSA_WITH_AES_256_GCM_SHA384'],
    ['TLS_ECDHE_ECDSA_WITH_RC4_128_SHA', 'TLS_ECDHE_ECDSA_WITH_RC4_128_SHA'],
    ['TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA', 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA'],
    ['TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA', 'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA'],
    ['TLS_ECDHE_RSA_WITH_RC4_128_SHA', 'TLS_ECDHE_RSA_WITH_RC4_128_SHA'],
    ['TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA', 'TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA'],
    ['TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA', 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA'],
    ['TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA', 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'],
    ['TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256'],
    ['TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'],
    ['TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256', 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256'],
    ['TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384', 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384'],
    ['TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256', 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256'],
    ['TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384', 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384'],
    ['TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305', 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305'],
    ['TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305', 'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305'],
];
