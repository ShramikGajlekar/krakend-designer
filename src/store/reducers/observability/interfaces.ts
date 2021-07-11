export interface Logging {
    level: string;
    prefix: string;
    enableLogstash: boolean;
    messageFormat: string;
    sendLogsToSysLog: boolean;
    sendLogsToStdOut: boolean;
}

export interface GELF {
    address: string;
    enableTCP: boolean;
}

export interface Metrics {
    disableStatsEndpoint: boolean;
    disableProxy: boolean;
    disableRouter: boolean;
    disableBackendLayermetrics: boolean;
    listenAddress: string;
    collectionTime: string;
}

export interface OpenCensus {
    logger: boolean;
    zipkin: boolean;
    jaeger: boolean;
    influxDB: boolean;
    prometheus: boolean;
    awsXray: boolean;
    googleStackDriver: boolean;
    datadog: boolean;
    openCensusAgent: boolean;
    globalSampleRate: number;
    globalReportingPeriod: number;
}

export interface InfluxDBConf {
    address: string;
    database: string;
    writeTimeout: number;
}

export interface ZipkinConf {
    collectorURL: string;
    serviceName: string;
}

export interface JaegerConf {
    endpoint: string;
    serviceName: string;
}

export interface PrometheusConf {
    port: number;
}

export interface AWSXRayConf {
    region: string;
    serviceVersion: string;
    useCredsFromEnv: boolean;
    awsAccessKey: string;
    awsSecretKey: string;
}

export interface StackDriverConf {
    projectID: string;
    metricsPrefix: string;
    labelName: string;
    labelValues: string[];
}

export interface DatadogConf {
    nameSpace: string;
    service: string;
    traceAddress: string;
    statsAddress: string;
    tags: string[];
    globalTags: string[];
}

export interface OcagentConf {
    collectorAddress: string;
    serviceName: string;
    reconnectionTime: string;
    insecure: boolean;
    enableCompression: boolean;
    headers: Header[];
}

export interface Header {
    headerName: string;
    value: string;
}

export interface Instana {
    agentHost: string;
    agentPort: number;
    service: string;
}
