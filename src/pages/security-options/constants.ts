export enum OauthSettingsChangeType {
    EnableOauth = 'EnableOauth',
    ClientID = 'Client',
    ClientSecret = 'ClientSecret',
    TokenURL = 'TokenURL',
    Scopes = 'Scopes',
    AdditionalParameters = 'AdditionalParameters',
}

export enum SecurityHeadersChangeType {
    EnableHTTP = 'EnableHTTP',
    AllowedHosts = 'AllowedHosts',
    ForceSSL = 'ForceSSL',
    SSLHost = 'SSLHost',
    Port = 'Port',
    SSLCertPath = 'SSLCertPath',
    SSLCertPrivKey = 'SSLCertPrivKey',
    HSTSMaxAge = 'HSTSMaxAge',
    IncludeAlsoSubdomains = 'IncludeAlsoSubdomains',
    EnableClickJacking = 'EnableClickJacking',
    ClickJackingValue = 'ClickJackingValue',
    PublicKeyPins = 'PublicKeyPins',
    EnableMimeSniffPrevention = 'EnableMimeSniffPrevention',
    EnableXSSFilter = 'EnableXSSFilter',
    CSP = 'CSP',
}
