/* eslint-disable */
export interface SecurityOptionsState {
    oauthSetting?: OauthSettings;
    securityHeaders?: SecurityHeaders;
}

export interface OauthSettings {
    enableOauth: boolean;
    clientID: string;
    clientSecret: string;
    tokenURL: string;
    scopes: string;
    additionalParameters: AdditionalParams[];
}

export interface AdditionalParams {
    name: string;
    value: string;
}

export interface SecurityHeaders {
    enableHTTPMiddleware: boolean;
    allowedHosts: string;
    sslOptions: SSLOptions;
    sslCertificate: string;
    sslPrivateKey: string;
    sslProxyHeaders: SSLProxyHeader[];
    maxAge: number;
    includeSubdomains: boolean;
    clickJacking?: ClickJacking;
    publicKeyPins: string;
    mimeSniffPrevention: boolean;
    xssProtection: XSSProtection;
}

export interface SSLOptions {
    forceSSL: boolean;
    sslHost: string;
    port: number;
}

export interface SSLProxyHeader {
    headerName: string;
    headerValue: string;
}

export interface ClickJacking {
    enableClickJacking: boolean;
    value?: string;
}

export interface XSSProtection {
    enableBrowserXSSFilter: boolean;
    csp: string;
}
