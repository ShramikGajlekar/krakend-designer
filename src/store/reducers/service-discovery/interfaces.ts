export interface ETCDMiddleware {
    enable: boolean;
    availableETCDMachines: string[];
    dialTimeOut?: string;
    dialKeepAlive?: string;
    timeOutPerReq?: string;
    certificate?: string;
    privKey?: string;
    caCert?: string;
}

export interface ServiceDiscovery {
    etcdMiddleware: ETCDMiddleware;
}
