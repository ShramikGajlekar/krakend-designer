import { BooleanLiteral } from 'typescript';

export interface RateLimiting {
    enabled: boolean;
    rateLimit: number;
    defaultUserQuota: number;
}

export interface TimeOutAndCacheTTL {
    timeout: string;
    cacheTTL: string;
}

export interface CustomCiphers {
    enabled: boolean;
    customCiphers: string[];
}

export interface JWTValidation {
    enable: boolean;
    algorithm: string;
    jwkURI: string;
    scopesToValidate: string[];
    matcher: string;
    scopesKey: string;
    issuer: string;
    audience: string[];
    roles: string[];
    rolesKey: string;
    cookieName: string;
    fingerPrints: string[];
    customCipherSuites: CustomCiphers;
    enableCaching: boolean;
    disableJWKSecurity: boolean;
}

export interface JWTSigning {
    enable: boolean;
    algorithm: string;
    jwkURI: string;
    keysToSign: string[];
    keyID: string;
    customCipherSuites: CustomCiphers;
    fingerPrints: string[];
    disableJWKSecurity: boolean;
    fullSerialization: boolean;
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

export interface securityHeaders {
    enableHTTPSecureMiddleware: boolean;
    allowedHosts: string[];
    forceSSL: boolean;
    sslHostDomain: string;
    sslHostPort: number;
    sslCertificate: string;
    sslPrivateKey: string;
    sslProxy: SSLProxy[];
    maxAge: number;
    includeSubDomains: boolean;
    enableClickJacking: boolean;
    publicKeyPins: boolean;
    mimeSniffPrevention: boolean;
    enableXSSFilter: boolean;
    contentSecurityPolicy: string;
}

export interface SSLProxy {
    proxyHeader: string;
    proxyValue: string;
}

export interface BackendApiCalls {
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
    recognizedQueryString: string[];
    rateLimiting: RateLimiting;
    customCombiner?: string;
    concurrentCalls?: number;
    headers: string[];
    timeoutAndCacheTTL: TimeOutAndCacheTTL;
    jwtValidation: JWTValidation;
    jwtSigning: JWTSigning;
    enableSequentialProxy?: boolean;
    backendEndpoint: BackendApiCalls[];
    stubResponse?: StubResponse;
}

// PayloadInterfaces
export interface EditEndpoint {
    index: number;
    endpoint: EndpointInfo;
}

export interface ChangeEndpointMethod {
    index: number;
    method: string;
}

export interface RemoveQueryString {
    endpointIndex: number;
    queryIndex: number;
}

export interface RemoveHeader {
    endpointIndex: number;
    queryIndex: number;
}

export interface RemoveScopes {
    endpointIndex: number;
    scopeIndex: number;
}

export interface RemoveAudience {
    endpointIndex: number;
    audIndex: number;
}

export interface RemoveRole {
    endpointIndex: number;
    roleIndex: number;
}

export interface RemoveFingerprint {
    endpointIndex: number;
    fingerprintIndex: number;
}

export interface ModifyCipherSuites {
    endpointIndex: number;
    customCiphers: string[];
}

export interface ModifyJWTValidation {
    endpointIndex: number;
    jwtValidation: JWTValidation;
}

export interface ModifyJWTSigning {
    endpointIndex: number;
    jwtSigning: JWTSigning;
}

export interface ModifyMatcher {
    endpointIndex: number;
    matcher: string;
}

export interface EndpointSettingsArrayStringAdder {
    endpointIndex: number;
    param: string;
}

export interface EndpointSettingsArrayRemover {
    endpointIndex: number;
    paramIndex: number;
}
