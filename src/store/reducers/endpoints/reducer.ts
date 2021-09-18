/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    EndpointInfo,
    EditEndpoint,
    ChangeEndpointMethod,
    AddQueryString,
    RemoveQueryString,
    AddHeader,
    RemoveHeader,
    AddScopes,
    RemoveScopes,
    AddAudience,
    RemoveAudience,
    AddRole,
    RemoveRole,
    AddFingerprint,
    RemoveFingerprint,
    ModifyCipherSuites,
    ModifyJWT,
    ModifyMatcher,
} from './interfaces';

const initialState: EndpointInfo[] = [];

const endpointsSlice = createSlice({
    name: 'endpoints',
    initialState,
    reducers: {
        addEndpoints(state, action: PayloadAction<EndpointInfo>) {
            state.push(action.payload);
        },
        modifyMethod(state, action: PayloadAction<ChangeEndpointMethod>) {
            state[action.payload.index].method = action.payload.method;
        },
        modifyEndpoint(state, action: PayloadAction<EditEndpoint>) {
            state[action.payload.index] = action.payload.endpoint;
        },
        addQueryString(state, action: PayloadAction<AddQueryString>) {
            state[action.payload.index].recognizedQueryString?.push(action.payload.param);
        },
        removeQueryString(state, action: PayloadAction<RemoveQueryString>) {
            state[action.payload.endpointIndex].recognizedQueryString?.splice(action.payload.queryIndex, 1);
        },
        addHeader(state, action: PayloadAction<AddHeader>) {
            state[action.payload.index].headers?.push(action.payload.param);
        },
        removeHeader(state, action: PayloadAction<RemoveHeader>) {
            state[action.payload.endpointIndex].headers?.splice(action.payload.queryIndex, 1);
        },
        addScopes(state, action: PayloadAction<AddScopes>) {
            state[action.payload.index].jwtValidation.scopesToValidate?.push(action.payload.scope);
        },
        removeScopes(state, action: PayloadAction<RemoveScopes>) {
            state[action.payload.endpointIndex].jwtValidation.scopesToValidate?.splice(action.payload.scopeIndex, 1);
        },
        addAudience(state, action: PayloadAction<AddAudience>) {
            state[action.payload.index].jwtValidation.audience?.push(action.payload.audience);
        },
        removeAudience(state, action: PayloadAction<RemoveAudience>) {
            state[action.payload.endpointIndex].jwtValidation.audience?.splice(action.payload.audIndex, 1);
        },
        addRole(state, action: PayloadAction<AddRole>) {
            state[action.payload.index].jwtValidation.roles?.push(action.payload.role);
        },
        removeRole(state, action: PayloadAction<RemoveRole>) {
            state[action.payload.endpointIndex].jwtValidation.roles?.splice(action.payload.roleIndex, 1);
        },
        addFingerprint(state, action: PayloadAction<AddFingerprint>) {
            state[action.payload.index].jwtValidation.fingerPrints?.push(action.payload.fingerprint);
        },
        removeFingerprint(state, action: PayloadAction<RemoveFingerprint>) {
            state[action.payload.endpointIndex].jwtValidation.fingerPrints?.splice(action.payload.fingerprintIndex, 1);
        },
        modifyCustomCiphers(state, action: PayloadAction<ModifyCipherSuites>) {
            state[action.payload.endpointIndex].jwtValidation.customCipherSuites.customCiphers =
                action.payload.customCiphers;
        },
        modifyJWTValidation(state, action: PayloadAction<ModifyJWT>) {
            state[action.payload.endpointIndex].jwtValidation = action.payload.jwtValidation;
        },
        modifyMatcher(state, action: PayloadAction<ModifyMatcher>) {
            state[action.payload.endpointIndex].jwtValidation.matcher = action.payload.matcher;
        },
    },
});
export const {
    addEndpoints,
    modifyEndpoint,
    modifyMethod,
    addQueryString,
    removeQueryString,
    addScopes,
    removeScopes,
    addAudience,
    removeAudience,
    addRole,
    removeRole,
    addFingerprint,
    removeFingerprint,
    modifyCustomCiphers,
    modifyJWTValidation,
    modifyMatcher,
    addHeader,
    removeHeader,
} = endpointsSlice.actions;
export default endpointsSlice.reducer;
