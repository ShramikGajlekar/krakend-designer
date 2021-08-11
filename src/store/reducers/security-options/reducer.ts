/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SecurityOptionsState, OauthSettings, SecurityHeaders } from './interfaces';

const initialState: SecurityOptionsState = {};
const endpointsSlice = createSlice({
    name: 'security-headers',
    initialState,
    reducers: {
        updateLoggingConf(state, action: PayloadAction<OauthSettings>) {
            state.oauthSetting = action.payload;
        },
        updateGelfConf(state, action: PayloadAction<SecurityHeaders>) {
            state.securityHeaders = action.payload;
        },
    },
});

export const { updateLoggingConf, updateGelfConf } = endpointsSlice.actions;
export default endpointsSlice.reducer;
