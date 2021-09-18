/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    EndpointInfo,
    EditEndpoint,
    ChangeEndpointMethod,
    ModifyCipherSuites,
    ModifyJWTValidation,
    ModifyMatcher,
    ModifyJWTSigning,
    EndpointSettingsArrayStringAdder,
    EndpointSettingsArrayRemover,
} from './interfaces';

const initialState: EndpointInfo[] = [];

const endpointsSlice = createSlice({
    name: 'endpoints',
    initialState,
    reducers: {
        addEndpoints(state, action: PayloadAction<EndpointInfo>) {
            state.push(action.payload);
        },
        modifyMethod(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].method = action.payload.param;
        },
        modifyOutput(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].output = action.payload.param;
        },
        modifyEndpoint(state, action: PayloadAction<EditEndpoint>) {
            state[action.payload.index] = action.payload.endpoint;
        },
        addQueryString(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].recognizedQueryString?.push(action.payload.param);
        },
        removeQueryString(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].recognizedQueryString?.splice(action.payload.paramIndex, 1);
        },
        addHeader(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].headers?.push(action.payload.param);
        },
        removeHeader(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].headers?.splice(action.payload.paramIndex, 1);
        },
        addScopes(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].jwtValidation.scopesToValidate?.push(action.payload.param);
        },
        removeScopes(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].jwtValidation.scopesToValidate?.splice(action.payload.paramIndex, 1);
        },
        addAudience(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].jwtValidation.audience?.push(action.payload.param);
        },
        removeAudience(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].jwtValidation.audience?.splice(action.payload.paramIndex, 1);
        },
        addRole(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].jwtValidation.roles?.push(action.payload.param);
        },
        removeRole(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].jwtValidation.roles?.splice(action.payload.paramIndex, 1);
        },
        addFingerprint(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].jwtValidation.fingerPrints?.push(action.payload.param);
        },
        removeFingerprint(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].jwtValidation.fingerPrints?.splice(action.payload.paramIndex, 1);
        },
        modifyCustomCiphers(state, action: PayloadAction<ModifyCipherSuites>) {
            state[action.payload.endpointIndex].jwtValidation.customCipherSuites.customCiphers =
                action.payload.customCiphers;
        },
        modifyJWTValidation(state, action: PayloadAction<ModifyJWTValidation>) {
            state[action.payload.endpointIndex].jwtValidation = action.payload.jwtValidation;
        },
        modifyMatcher(state, action: PayloadAction<ModifyMatcher>) {
            state[action.payload.endpointIndex].jwtValidation.matcher = action.payload.matcher;
        },
        modifyJWTSigning(state, action: PayloadAction<ModifyJWTSigning>) {
            state[action.payload.endpointIndex].jwtSigning = action.payload.jwtSigning;
        },
        addFingerprintJWTSigning(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].jwtSigning.fingerPrints?.push(action.payload.param);
        },
        removeFingerprintJWTSigning(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].jwtSigning.fingerPrints?.splice(action.payload.paramIndex, 1);
        },
        addSigningKey(state, action: PayloadAction<EndpointSettingsArrayStringAdder>) {
            state[action.payload.endpointIndex].jwtSigning.keysToSign?.push(action.payload.param);
        },
        removeSigningKey(state, action: PayloadAction<EndpointSettingsArrayRemover>) {
            state[action.payload.endpointIndex].jwtSigning.keysToSign?.splice(action.payload.paramIndex, 1);
        },
        modifyCustomCiphersJWTSigning(state, action: PayloadAction<ModifyCipherSuites>) {
            state[action.payload.endpointIndex].jwtSigning.customCipherSuites.customCiphers =
                action.payload.customCiphers;
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
    modifyJWTSigning,
    addFingerprintJWTSigning,
    removeFingerprintJWTSigning,
    modifyCustomCiphersJWTSigning,
    addSigningKey,
    removeSigningKey,
    modifyOutput,
} = endpointsSlice.actions;
export default endpointsSlice.reducer;
