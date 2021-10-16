import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import React from 'react';
import { modifyHTTPServerSettings } from '../../../store/reducers/service-config/reducer';
import { HTTPServerSettings } from '../../../store/reducers/service-config/interfaces';
import {
    changeTypeHTTPServerSettingPort,
    changeTypeHTTPServerSettingEnableHTTPS,
    changeTypeHTTPServerSettingPublicKey,
    changeTypeHTTPServerSettingPrivateKey,
    changeTypeHTTPServerSettingReadTimeout,
    changeTypeHTTPServerSettingWriteTimeout,
    changeTypeHTTPServerSettingIdleTimeout,
    changeTypeHTTPServerSettingReadHeaderTimeout,
    changeTypeHostInfoSanitize,
} from '../constants';
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
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
}));

// const serviceConfigState = useSelector((state) => state.serviceConfig);

export const HTTPServerSettingsCard = (): JSX.Element => {
    const classes = useStyles();

    const httpServerSettings = useAppSelector((state) => state.serviceConfig.httpServerSettings);

    const dispatch = useAppDispatch();

    const handleChangeHTTPServerSettings = (event: React.ChangeEvent<HTMLInputElement>, eventType: string) => {
        let changedHTTPServerSettings: HTTPServerSettings = {
            port: httpServerSettings?.port,
            publicKey: httpServerSettings?.publicKey,
            privateKey: httpServerSettings?.privateKey,
            enableHTTPS: httpServerSettings?.enableHTTPS,
            httpReadTimeOut: httpServerSettings?.httpReadTimeOut,
            httpWriteTimeOut: httpServerSettings?.httpWriteTimeOut,
            httpIdleTimeOut: httpServerSettings?.httpIdleTimeOut,
            httpReadHeaderTimeOut: httpServerSettings?.httpReadHeaderTimeOut,
        };

        switch (eventType) {
            case changeTypeHTTPServerSettingPort:
                changedHTTPServerSettings.port = event.target.valueAsNumber;
                break;
            case changeTypeHTTPServerSettingEnableHTTPS:
                changedHTTPServerSettings.enableHTTPS = event.target.checked;
                break;
            case changeTypeHTTPServerSettingPublicKey:
                changedHTTPServerSettings.publicKey = event.target.value;
                break;
            case changeTypeHTTPServerSettingPrivateKey:
                changedHTTPServerSettings.privateKey = event.target.value;
                break;
            case changeTypeHTTPServerSettingReadTimeout:
                changedHTTPServerSettings.httpReadTimeOut = event.target.value;
                break;
            case changeTypeHTTPServerSettingWriteTimeout:
                changedHTTPServerSettings.httpWriteTimeOut = event.target.value;
                break;
            case changeTypeHTTPServerSettingIdleTimeout:
                changedHTTPServerSettings.httpIdleTimeOut = event.target.value;
                break;
            case changeTypeHTTPServerSettingReadHeaderTimeout:
                changedHTTPServerSettings.httpReadHeaderTimeOut = event.target.value;
                break;

            default:
                return;
        }

        dispatch(modifyHTTPServerSettings(changedHTTPServerSettings));
    };

    const renderCertOptions = (): JSX.Element => {
        if (httpServerSettings?.enableHTTPS) {
            return (
                <>
                    <br></br>
                    <Grid container spacing={4}>
                        <Grid item sm={6}>
                            <TextField
                                value={httpServerSettings?.publicKey}
                                fullWidth
                                id="service-config-https-public-key"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPServerSettings(event, changeTypeHTTPServerSettingPublicKey)
                                }
                                label="Public Key"
                            />
                            <p>
                                Absolute path to the public key, or relative to the current working directory (
                                <code>CWD</code>)
                            </p>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                value={httpServerSettings?.privateKey}
                                fullWidth
                                id="service-config-https-private-key"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPServerSettings(event, changeTypeHTTPServerSettingPrivateKey)
                                }
                                label="Private Key"
                            />
                            <p>
                                Absolute path to the private key, or relative to the current working directory (
                                <code>CWD</code>)
                            </p>
                        </Grid>
                    </Grid>
                    <br></br>
                </>
            );
        } else {
            return <></>;
        }
    };

    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardTitle}>
                    <div className={classes.labelServiceName}>{'HTTP Server Settings'}</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <TextField
                        value={httpServerSettings?.port}
                        fullWidth
                        type="number"
                        id="service-config-http-port"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeHTTPServerSettings(event, changeTypeHTTPServerSettingPort)
                        }
                        label="Port"
                    />
                </CardContent>
                <CardContent>
                    <Box border={1} borderRadius={16} style={{ padding: 5 }} boxShadow={1}>
                        <Grid container spacing={1} direction="row" alignItems="flex-start" justifyContent="center">
                            <Grid item sm={12}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={httpServerSettings?.enableHTTPS}
                                                name="service-config-enable-https"
                                                onChange={(event) =>
                                                    handleChangeHTTPServerSettings(
                                                        event,
                                                        changeTypeHTTPServerSettingEnableHTTPS,
                                                    )
                                                }
                                            />
                                        }
                                        label="Enable HTTPS"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        {renderCertOptions()}
                    </Box>
                </CardContent>
                <CardContent>
                    <Grid container spacing={4} direction="row" alignItems="flex-start" justifyContent="center">
                        <Grid item sm={6}>
                            <TextField
                                value={httpServerSettings?.httpReadTimeOut}
                                fullWidth
                                id="service-config-http-read-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPServerSettings(event, changeTypeHTTPServerSettingReadTimeout)
                                }
                                label="HTTP Read Timeout"
                            />
                            <p>Maximum duration for reading the entire HTTP request, including the body.</p>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                value={httpServerSettings?.httpWriteTimeOut}
                                fullWidth
                                id="service-config-http-write-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPServerSettings(event, changeTypeHTTPServerSettingWriteTimeout)
                                }
                                label="HTTP Write Timeout"
                            />
                            <p>Maximum duration before timing-out writes of the response</p>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                value={httpServerSettings?.httpIdleTimeOut}
                                fullWidth
                                id="service-config-http-idle-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPServerSettings(event, changeTypeHTTPServerSettingIdleTimeout)
                                }
                                label="HTTP Idle Timeout"
                            />
                            <p>Maximum amount of time to wait for the next request when keepalives are enabled</p>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField
                                value={httpServerSettings?.httpReadHeaderTimeOut}
                                fullWidth
                                id="service-config-http-read-header-timeout"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeHTTPServerSettings(event, changeTypeHTTPServerSettingReadHeaderTimeout)
                                }
                                label="HTTP Read Header Timeout"
                            />
                            <p>Maximum time spent to read headers</p>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};
