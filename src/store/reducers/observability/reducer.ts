/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AWSXRayConf,
    DatadogConf,
    GELF,
    InfluxDBConf,
    Instana,
    JaegerConf,
    Logging,
    Metrics,
    ObservabilityState,
    OcagentConf,
    OpenCensus,
    PrometheusConf,
    StackDriverConf,
    ZipkinConf,
} from './interfaces';

const initialState: ObservabilityState = {};
const endpointsSlice = createSlice({
    name: 'observability',
    initialState,
    reducers: {
        updateLoggingConf(state, action: PayloadAction<Logging>) {
            state.logging = action.payload;
        },
        updateGelfConf(state, action: PayloadAction<GELF>) {
            state.gelf = action.payload;
        },
        updateMetricsConf(state, action: PayloadAction<Metrics>) {
            state.metrics = action.payload;
        },
        updateOpenCensusConf(state, action: PayloadAction<OpenCensus>) {
            state.openCensus = action.payload;
        },
        updateInfluxConf(state, action: PayloadAction<InfluxDBConf>) {
            state.influxDBConf = action.payload;
        },
        updateZipkinConf(state, action: PayloadAction<ZipkinConf>) {
            state.zipkinConf = action.payload;
        },
        updateJaegerConf(state, action: PayloadAction<JaegerConf>) {
            state.jaegerConf = action.payload;
        },
        updatePrometheusConfConf(state, action: PayloadAction<PrometheusConf>) {
            state.prometheusConf = action.payload;
        },
        updateAWSXRayConf(state, action: PayloadAction<AWSXRayConf>) {
            state.awsXRAYConf = action.payload;
        },
        updateStackDriverConf(state, action: PayloadAction<StackDriverConf>) {
            state.stackdriverConf = action.payload;
        },
        updateDatadogConf(state, action: PayloadAction<DatadogConf>) {
            state.datadogConf = action.payload;
        },
        updateOcagentConf(state, action: PayloadAction<OcagentConf>) {
            state.ocagentConf = action.payload;
        },
        updateInstana(state, action: PayloadAction<Instana>) {
            state.instana = action.payload;
        },
    },
});

export const {
    updateLoggingConf,
    updateGelfConf,
    updateMetricsConf,
    updateOpenCensusConf,
    updateInfluxConf,
    updateZipkinConf,
    updateJaegerConf,
    updatePrometheusConfConf,
    updateAWSXRayConf,
    updateStackDriverConf,
    updateDatadogConf,
    updateOcagentConf,
    updateInstana,
} = endpointsSlice.actions;
export default endpointsSlice.reducer;
