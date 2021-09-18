/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SecurityOptionsState, OauthSettings, SecurityHeaders } from './interfaces';

const initialState: SecurityOptionsState = {
    oauthSetting: {
        enableOauth: false,
        clientID: '',
        clientSecret: '',
        tokenURL: '',
        scopes: '',
        additionalParameters: [],
    },
    securityHeaders: {
        enableHTTPMiddleware: false,
        allowedHosts: '',
        sslOptions: { forceSSL: false, sslHost: '', port: 0 },
        sslCertificate: '',
        sslPrivateKey: '',
        sslProxyHeaders: [],
        maxAge: 0,
        includeSubdomains: false,
        clickJacking: { enableClickJacking: false, value: '' },
        publicKeyPins: '',
        mimeSniffPrevention: false,
        xssProtection: { enableBrowserXSSFilter: false, csp: '' },
    },
};
const securityOptionsSlice = createSlice({
    name: 'security-headers',
    initialState,
    reducers: {
        updateOAuthSetting(state, action: PayloadAction<OauthSettings>) {
            state.oauthSetting = action.payload;
        },
        updateSecurityHeaders(state, action: PayloadAction<SecurityHeaders>) {
            state.securityHeaders = action.payload;
        },
    },
});

export const { updateOAuthSetting, updateSecurityHeaders } = securityOptionsSlice.actions;
export default securityOptionsSlice.reducer;
