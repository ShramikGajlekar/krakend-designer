/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EndpointInfo, EditEndpoint } from './interfaces';

const initialState: EndpointInfo[] = [];

const endpointsSlice = createSlice({
    name: 'endpoints',
    initialState,
    reducers: {
        addEndpoints(state, action: PayloadAction<EndpointInfo>) {
            state.push(action.payload);
        },
        modifyEndpoint(state, action: PayloadAction<EditEndpoint>) {
            state[action.payload.index] = action.payload.endpoint;
        },
    },
});
export const { addEndpoints, modifyEndpoint } = endpointsSlice.actions;
export default endpointsSlice.reducer;
