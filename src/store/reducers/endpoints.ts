/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RateLimiting {
    enabled: boolean;
    rateLimit: number;
    defaultUserQuota: number;
}

interface TimeOutAndCacheTTL {
    timeout: string;
    cacheTTL: string;
}

interface CustomeCiphers {
    enabled: boolean;
    customCiphers: string[];
}

interface JWTValidation {
    algorithm: string;
    jwkURI: string;
    scopesToValidate: string;
    matcher: string;
    scopesKey: string;
    issuer: string;
    audience: string[];
    roles: string[];
    rolesKey: string;
    cookieName: string;
    fingerPrints: string;
    customCipherSuites: CustomeCiphers;
}

interface BackendRateLimiting {
    maxRateLimit: number;
    capacity: number;
}

interface BackendRespAttrRenaming {
    originalAttr: string;
    renamedAttr: string;
}

interface RespObjectManipulation {
    filteringMode: string;
    filterList: string[];
    capturingGroup: string;
    renaming: BackendRespAttrRenaming[];
}

interface RespArrayManipulation {
    operationType: string;
    originalAttr: string;
    targetAttr: string;
}

interface AMQPConsumer {
    queueName: string;
    exchange: string;
    routingKeys: string[];
    prefetchCount: number;
    durable: boolean;
    autoDelete: boolean;
    noWait: boolean;
    noLocal: boolean;
}

interface AMQPProducer {
    queueName: string;
    exchange: string;
    durable: boolean;
    autoDelete: boolean;
    noWait: boolean;
    exclusive: boolean;
    mandatory: boolean;
    immediate: boolean;
}

interface PubSub {
    type: string;
    url: string;
}

interface AWSLambda {
    functionName: string;
    functionParamName: string;
    region: string;
    maxRetries: number;
    endpoint: string;
}

interface CircuitBreaker {
    name: string;
    logOnStateChange: boolean;
    interval: number;
    timeOut: number;
    maxErrors: number;
}

interface AuthAdditionEndpointParam {
    name: string;
    value: string;
}

interface EndpointBackendAuthorization {
    clientID: string;
    clientSecret: string;
    tokenURL: string;
    scopes: string;
    additionalEndpointParameters: AuthAdditionEndpointParam[];
}

interface BackendApiCalls {
    enableSequentialProxy?: boolean;
    hostResolution: string;
    hosts: string[];
    disableHostSanitization: boolean;
    amqpConsumer?: AMQPConsumer;
    amqpProducer?: AMQPProducer;
    psSubscriber?: PubSub;
    psPublisher?: PubSub;
    awsLambda?: AWSLambda;
    backendEndpoint: string;
    httpVerb: string;
    rateLimit?: BackendRateLimiting;
    decodeAs: string;
    rootObject: string;
    nonObjResponse?: boolean;
    respObjManipulation?: RespObjectManipulation;
    arrayManipulation?: RespArrayManipulation[];
    martianDSL?: string;
    backendCaching?: boolean;
    circuitBreaker?: CircuitBreaker;
    authorization?: EndpointBackendAuthorization;
}

interface StubResponse {
    response: string;
    strategy: string;
}

interface EndpointInfo {
    endpoint: string;
    method: string;
    output: string;
    recognizedQueryString?: string;
    rateLimiting?: RateLimiting;
    customCombiner?: string;
    concurrentCalls?: number;
    headers?: string[];
    timeoutAndCacheTTL?: TimeOutAndCacheTTL;
    customeCiphers?: CustomeCiphers;
    enableCaching?: boolean;
    disableJWKSecurity?: boolean;
    backendEndpoint?: BackendApiCalls[];
    stubResponse?: StubResponse;
}

interface EditEndpoint {
    index: number;
    endpoint: EndpointInfo;
}

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
