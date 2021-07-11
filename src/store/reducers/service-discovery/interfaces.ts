export interface ETCDMiddleware {
    availableETCDMachines: string;
    dialTimeOut?: number;
    dialKeepAlive?: number;
    timeOutPerReq?: number;
    certificate?: string;
    privKey?: string;
    caCert?: string;
}
