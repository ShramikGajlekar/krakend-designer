import { Checkbox, Divider, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import React from 'react';
import {
    changeTypeHTTPClientIdleConnectionTimeout,
    changeTypeHTTPClientResponseHeaderTimeOut,
    changeTypeHTTPClientExpectContinueTimeOut,
    changeTypeHTTPClientMaxIdleConnections,
    changeTypeHTTPClientMaxIdleConnectionsPerHost,
    changeTypeHTTPClientDisableKeepAlives,
    changeTypeHTTPClientDisableCompression,
    changeTypeHTTPClientDialerTimeOut,
    changeTypeHTTPClientDialerFallbackDelay,
    changeTypeHTTPClientDialerKeepAlive,
    changeTypeBotDetectorEnable,
} from '../constants';
import { HTTPClientSettings } from '../../../store/reducers/service-config/interfaces';
import { modifyHTTPClientSettings } from '../../../store/reducers/service-config/reducer';

const useStyles = makeStyles((theme) => ({
    labelServiceName: {
        // minHeight: '200px',
        ...theme.typography.button,
        alignItems: 'left',
    },
    card: {
        marginTop: theme.spacing(5),
    },
    cardTitle: {
        backgroundColor: '#5E6CA1',
    },
}));

// const serviceConfigState = useSelector((state) => state.serviceConfig);

export const HTTPClientSettingsCard = (): JSX.Element => {
    const classes = useStyles();

    const httpClientSettings = useAppSelector((state) => state.serviceConfig.httpClientSettings);

    const dispatch = useAppDispatch();

    const handleChangeHTTPClientSetting = (event: React.ChangeEvent<HTMLInputElement>, eventType: string) => {
        let changedHTTPClientSettings: HTTPClientSettings = {
            timeouts: {
                idleConnectionTimeOut: httpClientSettings.timeouts.idleConnectionTimeOut,
                responseHeaderTimeOut: httpClientSettings.timeouts.responseHeaderTimeOut,
                expectContinueTimeOut: httpClientSettings.timeouts.expectContinueTimeOut,
            },
            connections: {
                maxIdleConn: httpClientSettings.connections.maxIdleConn,
                maxIdleConnPerHost: httpClientSettings.connections.maxIdleConnPerHost,
                disableCompression: httpClientSettings.connections.disableCompression,
                disableKeepAlives: httpClientSettings.connections.disableKeepAlives,
            },
            dialSettings: {
                dialerKeepAlive: httpClientSettings.dialSettings.dialerKeepAlive,
                dialerFallbackDelay: httpClientSettings.dialSettings.dialerFallbackDelay,
                dialerTimeOut: httpClientSettings.dialSettings.dialerTimeOut,
            },
        };

        switch (eventType) {
            case changeTypeHTTPClientIdleConnectionTimeout:
                changedHTTPClientSettings.timeouts.idleConnectionTimeOut = event.target.value;
                break;
            case changeTypeHTTPClientResponseHeaderTimeOut:
                changedHTTPClientSettings.timeouts.responseHeaderTimeOut = event.target.value;
                break;
            case changeTypeHTTPClientExpectContinueTimeOut:
                changedHTTPClientSettings.timeouts.expectContinueTimeOut = event.target.value;
                break;
            case changeTypeHTTPClientMaxIdleConnections:
                changedHTTPClientSettings.connections.maxIdleConn = event.target.valueAsNumber;
                break;
            case changeTypeHTTPClientMaxIdleConnectionsPerHost:
                changedHTTPClientSettings.connections.maxIdleConnPerHost = event.target.valueAsNumber;
                break;
            case changeTypeHTTPClientDisableKeepAlives:
                changedHTTPClientSettings.connections.disableKeepAlives = event.target.checked;
                break;
            case changeTypeHTTPClientDisableCompression:
                changedHTTPClientSettings.connections.disableCompression = event.target.checked;
                break;
            case changeTypeHTTPClientDialerTimeOut:
                changedHTTPClientSettings.dialSettings.dialerTimeOut = event.target.value;
                break;
            case changeTypeHTTPClientDialerFallbackDelay:
                changedHTTPClientSettings.dialSettings.dialerFallbackDelay = event.target.value;
                break;
            case changeTypeHTTPClientDialerKeepAlive:
                changedHTTPClientSettings.dialSettings.dialerKeepAlive = event.target.value;
                break;
            default:
                break;
        }

        dispatch(modifyHTTPClientSettings(changedHTTPClientSettings));
    };

    return (
        <div>
            <Card className={classes.card} variant="outlined" style={{ boxShadow: '10px 0px 10px 0px grey' }}>
                <CardContent className={classes.cardTitle}>
                    <div className={classes.labelServiceName}>{'HTTP Client Setting'}</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <p>
                        These are specific settings to deal with the HTTP client used to query your backends. You
                        usually don't need to set any of these values
                    </p>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={4}
                        style={{
                            borderStyle: 'solid',
                            borderColor: 'rgba(0, 0, 0, 0.12)',
                            borderTop: '1px',
                            borderLeft: '1px',
                            borderRight: '1px',
                            marginBottom: '0px',
                            marginTop: '10px',
                        }}
                    >
                        <Grid item sm={4}>
                            <TextField
                                value={httpClientSettings.timeouts.idleConnectionTimeOut}
                                fullWidth
                                id="http-client-idle-connection-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientIdleConnectionTimeout)
                                }
                                placeholder="0s"
                                label="IDLE Connection Timeout"
                            />
                            <p>
                                Maximum amount of time an idle (keep-alive) connection will remain idle before closing
                                itself. Zero means no limit
                            </p>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                value={httpClientSettings.timeouts.responseHeaderTimeOut}
                                fullWidth
                                id="http-client-response-header-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientResponseHeaderTimeOut)
                                }
                                placeholder="0s"
                                label="Response Header Timeout"
                            />
                            <p>
                                Time to wait for a server's response headers after fully writing the request. This time
                                does not include the time to read the response body.
                            </p>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                value={httpClientSettings.timeouts.expectContinueTimeOut}
                                fullWidth
                                id="http-client-expect-continue-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientExpectContinueTimeOut)
                                }
                                placeholder="0s"
                                label="Expect Continue Timeout"
                            />
                            <p>
                                Time to wait for a server's first response headers after fully writing the request
                                headers if the request has an <code>"Expect: 100-continue"</code> header. Zero means no
                                timeout
                            </p>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={4}
                        style={{
                            marginTop: '20px',
                            borderStyle: 'solid',
                            borderColor: 'rgba(0, 0, 0, 0.12)',
                            borderTop: '1px',
                            borderLeft: '1px',
                            borderRight: '1px',
                            marginBottom: '0px',
                        }}
                    >
                        <Grid item sm={3}>
                            <TextField
                                value={httpClientSettings.connections.maxIdleConn}
                                fullWidth
                                type="number"
                                id="http-client-max-idle-conn"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientMaxIdleConnections)
                                }
                                label="Maximum IDLE connections"
                            />
                            <p>
                                Maximum number of idle (keep-alive) connections across all hosts. <code>0</code> means
                                no limit.
                            </p>
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                value={httpClientSettings.connections.maxIdleConnPerHost}
                                fullWidth
                                type="number"
                                id="http-client-max-idle-conn-per-host"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientMaxIdleConnectionsPerHost)
                                }
                                label="Maximum IDLE connections per host"
                            />
                            <p>
                                Maximum number of IDLE connections that you allow per-host. Defaults to <code>250</code>
                                .
                            </p>
                        </Grid>
                        <Grid item sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={httpClientSettings.connections.disableKeepAlives}
                                            name="http-client-disable-keep-alives"
                                            onChange={(event) =>
                                                handleChangeHTTPClientSetting(
                                                    event,
                                                    changeTypeHTTPClientDisableKeepAlives,
                                                )
                                            }
                                        />
                                    }
                                    label="Disable Keep-Alives"
                                />
                            </FormGroup>
                            <p>If set prevents re-use of TCP connections between different HTTP request</p>
                        </Grid>
                        <Grid item sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={httpClientSettings.connections.disableCompression}
                                            name="http-client-disable-compression"
                                            onChange={(event) =>
                                                handleChangeHTTPClientSetting(
                                                    event,
                                                    changeTypeHTTPClientDisableCompression,
                                                )
                                            }
                                        />
                                    }
                                    label="Disable Compression"
                                />
                            </FormGroup>
                            <p>
                                If set, prevents the Transport from requesting compression with an{' '}
                                <code>"Accept-Encoding: gzip"</code> request header.
                            </p>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={4}
                        style={{
                            marginTop: '10px',
                        }}
                    >
                        <Grid item sm={4}>
                            <TextField
                                value={httpClientSettings.dialSettings.dialerTimeOut}
                                fullWidth
                                id="http-client-dialer-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientDialerTimeOut)
                                }
                                placeholder="0s"
                                label="Dialer Timeout"
                            />
                            <p>Maximum amount of time a dial will wait for a connect to complete</p>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                value={httpClientSettings.dialSettings.dialerFallbackDelay}
                                fullWidth
                                id="http-client-dialer-fallback-delay"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientDialerFallbackDelay)
                                }
                                placeholder="0s"
                                label="Dialer Fallback Delay"
                            />
                            <p>
                                Length of time to wait before spawning a fallback connection. If zero, a default delay
                                of 300ms is used.
                            </p>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                value={httpClientSettings.dialSettings.dialerKeepAlive}
                                fullWidth
                                id="http-client-dialer-keep-alives"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPClientSetting(event, changeTypeHTTPClientDialerKeepAlive)
                                }
                                placeholder="0s"
                                label="Dialer Keep-Alive"
                            />
                            <p>
                                Keep-alive period for an active network connection. If zero, keep-alives are not
                                enabled.
                            </p>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                    <p>
                        <i className="fa fa-info"></i> For a more detailed explanation of this settings see the comments
                        in the{' '}
                        <a href="https://golang.org/src/net/http/transport.go#L160">HTTP client implementation</a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
