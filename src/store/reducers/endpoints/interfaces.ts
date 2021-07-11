export interface RateLimiting {
    enabled: boolean;
    rateLimit: number;
    defaultUserQuota: number;
}

export interface TimeOutAndCacheTTL {
    timeout: string;
    cacheTTL: string;
}

export interface CustomeCiphers {
    enabled: boolean;
    customCiphers: string[];
}

export interface JWTValidation {
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

export interface BackendRateLimiting {
    maxRateLimit: number;
    capacity: number;
}

export interface BackendRespAttrRenaming {
    originalAttr: string;
    renamedAttr: string;
}

export interface RespObjectManipulation {
    filteringMode: string;
    filterList: string[];
    capturingGroup: string;
    renaming: BackendRespAttrRenaming[];
}

export interface RespArrayManipulation {
    operationType: string;
    originalAttr: string;
    targetAttr: string;
}

export interface AMQPConsumer {
    queueName: string;
    exchange: string;
    routingKeys: string[];
    prefetchCount: number;
    durable: boolean;
    autoDelete: boolean;
    noWait: boolean;
    noLocal: boolean;
}

export interface AMQPProducer {
    queueName: string;
    exchange: string;
    durable: boolean;
    autoDelete: boolean;
    noWait: boolean;
    exclusive: boolean;
    mandatory: boolean;
    immediate: boolean;
}

export interface PubSub {
    type: string;
    url: string;
}

export interface AWSLambda {
    functionName: string;
    functionParamName: string;
    region: string;
    maxRetries: number;
    endpoint: string;
}

export interface CircuitBreaker {
    name: string;
    logOnStateChange: boolean;
    interval: number;
    timeOut: number;
    maxErrors: number;
}

export interface AuthAdditionEndpointParam {
    name: string;
    value: string;
}

export interface EndpointBackendAuthorization {
    clientID: string;
    clientSecret: string;
    tokenURL: string;
    scopes: string;
    additionalEndpointParameters: AuthAdditionEndpointParam[];
}

export interface BackendApiCalls {
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

export interface StubResponse {
    response: string;
    strategy: string;
}

export interface EndpointInfo {
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

export interface EditEndpoint {
    index: number;
    endpoint: EndpointInfo;
}
