import React from 'react';
import {
    Grid,
    FormControlLabel,
    FormGroup,
    Checkbox,
    FormControl,
    Select,
    Input,
    InputLabel,
    Icon,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
    changeEndpointURI,
    changeEndpointQueryParams,
    changeTypeHeader,
    changeTypeRateLimitEnable,
    changeTypeRateLimit,
    changeTypeRateLimitDefaultUserQuota,
    changeTypeCustomCombiner,
    changeTypeConcurrentCalls,
    changeTypeCacheTTL,
    changeTypeTimeOut,
    changeEndpointMethod,
} from '../constants';
import {
    addQueryString,
    modifyEndpoint,
    modifyMethod,
    removeQueryString,
    addHeader,
    removeHeader,
} from '../../../store/reducers/endpoints/reducer';
import TextInputArray from '../../../components/ui-molecules/text-input-array';
import { EndpointInfo } from '../../../store/reducers/endpoints/interfaces';
import { Chip, Dialog, Divider, MenuItem, MenuProps } from '@material-ui/core';
import { allowedMethods, encodingOptions } from '../../service-configuration/constants';

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
    removeButton: {
        marginTop: '25%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    button: {
        margin: theme.spacing(1),
    },
    gridItem: {
        marginTop: '2%',
    },
}));

interface IEndpointCardProps {
    endpointIndex: number;
}

export const EndpointCard: React.FunctionComponent<IEndpointCardProps> = ({ endpointIndex }) => {
    const classes = useStyles();

    // Dialog controls
    const [openThrottling, setOpenThrottling] = React.useState(false);
    const [openPipeCompositionOverride, setOpenPipeCompositionOverride] = React.useState(false);
    const [openTimeOutsAndCache, setOpenTimeOutsAndCache] = React.useState(false);
    const [openSecurityHeaders, setOpenSecurityHeaders] = React.useState(false);

    const handleOpenThrottling = () => {
        setOpenThrottling(true);
    };

    const handleCloseThrottling = () => {
        setOpenThrottling(false);
    };

    const handleOpenTimeOutsAndCache = () => {
        setOpenTimeOutsAndCache(true);
    };

    const handleCloseTimeOutsAndCache = () => {
        setOpenTimeOutsAndCache(false);
    };

    const handleOpenSecurityHeaders = () => {
        setOpenSecurityHeaders(true);
    };

    const handleCloseSecurityHeaders = () => {
        setOpenSecurityHeaders(false);
    };

    const handleOpenPipeCompositionOverride = () => {
        setOpenPipeCompositionOverride(true);
    };

    const handleClosePipeCompositionOverride = () => {
        setOpenPipeCompositionOverride(false);
    };

    const endpointInfo = useAppSelector((state) => state.endpoints[endpointIndex]);

    const dispatch = useAppDispatch();

    const handleAddMoreQueryString = () => {
        dispatch(addQueryString({ index: endpointIndex, param: '' }));
    };

    const handleRemoveQueryString = (index: number) => {
        dispatch(removeQueryString({ endpointIndex: endpointIndex, queryIndex: index }));
    };

    const handleAddMoreHeaders = () => {
        dispatch(addHeader({ index: endpointIndex, param: '' }));
    };

    const handleRemoveHeader = (index: number) => {
        dispatch(removeHeader({ endpointIndex: endpointIndex, queryIndex: index }));
    };

    const handleChangeEndpoint = (event: React.ChangeEvent<HTMLInputElement>, eventType: string, index: number) => {
        let changedEndpoint: EndpointInfo = JSON.parse(JSON.stringify(endpointInfo));

        let list: string[] = [];
        switch (eventType) {
            case changeEndpointURI:
                changedEndpoint.endpoint = event.target.value;
                break;
            case changeEndpointMethod:
                changedEndpoint.method = event.target.value;
                break;
            case changeEndpointQueryParams:
                list = [...changedEndpoint.recognizedQueryString];
                list[index] = event.target.value;
                changedEndpoint.recognizedQueryString = list;
                break;
            case changeTypeRateLimitEnable:
                changedEndpoint.rateLimiting.enabled = event.target.checked;
                break;
            case changeTypeRateLimit:
                changedEndpoint.rateLimiting.rateLimit = event.target.valueAsNumber;
                break;
            case changeTypeRateLimitDefaultUserQuota:
                changedEndpoint.rateLimiting.defaultUserQuota = event.target.valueAsNumber;
                break;
            case changeTypeCustomCombiner:
                changedEndpoint.customCombiner = event.target.value;
                break;
            case changeTypeHeader:
                list = [...changedEndpoint.headers];
                list[index] = event.target.value;
                changedEndpoint.headers = list;
                break;
            case changeTypeConcurrentCalls:
                changedEndpoint.concurrentCalls = event.target.valueAsNumber;
                break;
            case changeTypeTimeOut:
                changedEndpoint.timeoutAndCacheTTL.timeout = event.target.value;
                break;
            case changeTypeCacheTTL:
                changedEndpoint.timeoutAndCacheTTL.cacheTTL = event.target.value;
                break;
            default:
                break;
        }
        dispatch(modifyEndpoint({ index: endpointIndex, endpoint: changedEndpoint }));
    };

    const handleChangeEndpointMethod = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(modifyMethod({ index: endpointIndex, method: event.target.value as string }));
    };

    const renderThrottlingDialog = (): JSX.Element => {
        return (
            <Dialog open={openThrottling} onClose={handleCloseThrottling} aria-labelledby="form-throttling-dialog">
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={endpointInfo.rateLimiting.enabled}
                                name="endpoint-rate-limit-enabled"
                                onChange={(event) => handleChangeEndpoint(event, changeTypeRateLimitEnable, 0)}
                            />
                        }
                        label={'Enable rate limiting for ' + endpointInfo.endpoint}
                    />
                </FormGroup>
                <p>
                    Limit the number of requests this endpoint can receive. Read more on
                    <a href="/docs/throttling/rate-limit">rate limiting</a>
                </p>
                {endpointInfo.rateLimiting.enabled ? (
                    <DialogContent>
                        <TextField
                            value={endpointInfo.rateLimiting.rateLimit}
                            fullWidth
                            label="Rate Limit (reqs/sec)"
                            name={'endpoints-rate-limiting-rate-limit' + endpointIndex}
                            variant="outlined"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleChangeEndpoint(e, changeTypeRateLimit, 0)
                            }
                            type="number"
                        />
                        <DialogContentText>
                            Maximum requests per second you want to let this endpoint handle. Leave 0 for no default
                            limit.
                        </DialogContentText>
                        <br></br>
                        <br></br>
                        <TextField
                            value={endpointInfo.rateLimiting.defaultUserQuota}
                            fullWidth
                            label="Default user quota (reqs/sec)"
                            name={'endpoints-rate-limiting-default-user-quota' + endpointIndex}
                            variant="outlined"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleChangeEndpoint(e, changeTypeRateLimitDefaultUserQuota, 0)
                            }
                            type="number"
                        />
                        <DialogContentText>
                            Maximum requests per second you want to let this endpoint handle. Leave 0 for no default
                            limit.
                        </DialogContentText>
                    </DialogContent>
                ) : (
                    <></>
                )}
                <DialogActions>
                    <Button onClick={handleCloseThrottling} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderTimeOutsAndCacheDialog = (): JSX.Element => {
        return (
            <Dialog
                open={openTimeOutsAndCache}
                onClose={handleCloseTimeOutsAndCache}
                aria-labelledby="form-throttling-dialog"
            >
                <DialogTitle id="form-PipeCompositionoverride-dialog-title">
                    Override global configuration for {endpointInfo.endpoint}
                </DialogTitle>
                <p>
                    All the settings below are defined in the Service configuration, setting one or several values here
                    means overriding the settings for this specific endpoint only.
                </p>
                <p>
                    <strong>Valid time units are:</strong>
                    <code>
                        <abbr title="Nanoseconds">ns</abbr>
                    </code>
                    ,
                    <code>
                        <abbr title="Microseconds">us</abbr>
                    </code>
                    , (or <code>µs</code>),
                    <code>
                        <abbr title="Milliseconds">ms</abbr>
                    </code>
                    ,
                    <code>
                        <abbr title="Seconds">s</abbr>
                    </code>
                    ,
                    <code>
                        <abbr title="Minutes">m</abbr>
                    </code>
                    ,
                    <code>
                        <abbr title="Hours">h</abbr>
                    </code>
                    E.g: <code>1s</code>
                </p>
                <DialogContent>
                    <TextField
                        value={endpointInfo.timeoutAndCacheTTL?.timeout}
                        fullWidth
                        label="Timeout"
                        name={'endpoints-timeouts-and-cache-timeout' + endpointIndex}
                        variant="outlined"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeEndpoint(e, changeTypeTimeOut, 0)
                        }
                        placeholder="1s"
                        type="text"
                    />
                    <DialogContentText>
                        Maximum requests per second you want to let this endpoint handle. Leave 0 for no default limit.
                    </DialogContentText>
                    <br></br>
                    <br></br>
                    <TextField
                        value={endpointInfo.timeoutAndCacheTTL?.cacheTTL}
                        fullWidth
                        label="Cache TTL"
                        name={'endpoints-timeouts-and-cache-cacheTTL' + endpointIndex}
                        variant="outlined"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeEndpoint(e, changeTypeCacheTTL, 0)
                        }
                        placeholder="1s"
                        type="text"
                    />
                    <DialogContentText>
                        Maximum requests per second you want to let this endpoint handle. Leave 0 for no default limit.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTimeOutsAndCache} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderPipeCompositionOverrideDialog = (): JSX.Element => {
        return (
            <Dialog
                open={openPipeCompositionOverride}
                onClose={handleClosePipeCompositionOverride}
                aria-labelledby="form-PipeCompositionoverride-dialog"
            >
                <DialogTitle id="form-PipeCompositionoverride-dialog-title">
                    Advanced pipe composition for {endpointInfo.endpoint}
                </DialogTitle>
                <p>
                    If you have a custom combiner configure it here to modify the proxy pipe with your custom
                    configuration
                </p>
                {endpointInfo.rateLimiting.enabled ? (
                    <>
                        <DialogContent>
                            <TextField
                                value={endpointInfo.customCombiner}
                                fullWidth
                                label="Custom Combiner"
                                id="endpoints-rate-limiting-rate-limit"
                                variant="outlined"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeEndpoint(e, changeTypeCustomCombiner, 0)
                                }
                                placeholder="combiner name"
                            />
                            <DialogContentText>
                                Specify the combiner for merging the backend responses.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosePipeCompositionOverride} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <></>
                )}
            </Dialog>
        );
    };

    const renderDialogInputs = (): JSX.Element => {
        return (
            <>
                {renderThrottlingDialog()}
                {renderPipeCompositionOverrideDialog()}
                {renderTimeOutsAndCacheDialog()}
            </>
        );
    };

    // const renderJWTJWKInputs = () => {
    //     return (
    //         <Grid container spacing={2}>
    //             <Grid item className={classes.gridItem} sm={6}>
    //                 <JWTSigningCard endpointIndex={endpointIndex} />
    //             </Grid>
    //         </Grid>
    //     );
    // };

    return (
        <div>
            <Card className={classes.card} variant="outlined" style={{ boxShadow: '10px 0px 10px 0px grey' }}>
                <CardContent className={classes.cardTitle}>
                    <div className={classes.labelServiceName}>{'Service Name'}</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container direction={'row'} spacing={2}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={endpointInfo.endpoint}
                                fullWidth
                                id="endpoints-endpoint"
                                variant="outlined"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeEndpoint(e, changeEndpointURI, 0)
                                }
                                placeholder="/endpoint"
                                label="Krakend Endpoint"
                            />
                        </Grid>
                        <Grid item className={classes.gridItem} sm={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="endpoint-method-label"> Method</InputLabel>
                                <Select
                                    labelId="endpoint-method-label"
                                    id="endpoint-method"
                                    value={endpointInfo.method}
                                    label="Method"
                                    onChange={handleChangeEndpointMethod}
                                >
                                    {allowedMethods.map((method) => (
                                        <MenuItem key={'methods' + method[1]} value={method[0]}>
                                            {method[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="endpoint-method-label"> Method</InputLabel>
                                <Select
                                    labelId="endpoint-method-label"
                                    id="endpoint-method"
                                    value={endpointInfo.method}
                                    label="Method"
                                    onChange={handleChangeEndpointMethod}
                                >
                                    {encodingOptions.map((option) => (
                                        <MenuItem key={'options' + option[1]} value={option[0]}>
                                            {option[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction={'row'} spacing={2}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeEndpointQueryParams}
                                arr={endpointInfo?.recognizedQueryString}
                                label={'Recognized query string parameters (?param=value)'}
                                name="endpoint-query"
                                placeholder="parameter"
                                handleChangeArrayState={handleChangeEndpoint}
                                handleRemoveElementInArray={handleRemoveQueryString}
                                handleAddMoreElementInArray={handleAddMoreQueryString}
                                disable={(): boolean => {
                                    return _.last(endpointInfo?.recognizedQueryString)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        endpointInfo?.recognizedQueryString[index]?.length === 0 ||
                                        endpointInfo?.recognizedQueryString.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                        </Grid>
                        <Grid item className={classes.gridItem} sm={3}>
                            <Grid container direction={'row'} spacing={2}>
                                <Grid item className={classes.gridItem} sm={12}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<SettingsApplicationsIcon />}
                                        onClick={handleOpenThrottling}
                                    >
                                        Rate Limit Throttling
                                    </Button>
                                    <p>Enable usage limits for this endpoint</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={3}>
                            <Grid container direction={'row'} spacing={2}>
                                <Grid item className={classes.gridItem} sm={12}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<SettingsApplicationsIcon />}
                                        onClick={handleOpenPipeCompositionOverride}
                                    >
                                        Pipe Composition Override
                                    </Button>
                                    <p>Behaviour of the proxy pipe.</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container direction={'row'} spacing={2}>
                        <Grid item className={classes.gridItem} sm={3}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeTypeHeader}
                                arr={endpointInfo?.headers}
                                label={'Headers passing to backend'}
                                name="endpoint-headers"
                                placeholder="Content-Type"
                                handleChangeArrayState={handleChangeEndpoint}
                                handleRemoveElementInArray={handleRemoveHeader} // TODO: addmore headers
                                handleAddMoreElementInArray={handleAddMoreHeaders}
                                disable={(): boolean => {
                                    return _.last(endpointInfo?.headers)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        endpointInfo?.headers[index]?.length === 0 || endpointInfo?.headers.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                            <p>
                                Allowed headers to pass from client to each of the backends. These headers are not an
                                addition, but a replacement when they are set. Use only if you need custom headers to
                                pass back but ensure to declare all needed headers (including
                                <code>Content-Type</code>)
                            </p>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={3}>
                            <TextField
                                value={endpointInfo.concurrentCalls}
                                fullWidth
                                id="endpoints-concurrent-calls"
                                variant="outlined"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeEndpoint(e, changeTypeConcurrentCalls, 0)
                                }
                                type="number"
                                label="Concurrent Calls"
                            />
                            <p>
                                Parallel requests you want to send to the backend <strong>for the same request</strong>.
                                Fastest request is taken and the rest are discarded. This value should be between 1 and
                                3 (or higher if your backend can support very high load)
                            </p>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={3}>
                            <Grid container direction={'row'} spacing={2}>
                                <Grid item className={classes.gridItem} sm={12}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<SettingsApplicationsIcon />}
                                        onClick={handleOpenTimeOutsAndCache}
                                    >
                                        Timeout and Cache TTL Defaults
                                    </Button>
                                    <p>Override default settings for timeouts and cache ttl for this endpoint.</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={3}>
                            <Grid container direction={'row'} spacing={2}>
                                <Grid item className={classes.gridItem} sm={12}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<SettingsApplicationsIcon />}
                                        onClick={handleOpenSecurityHeaders}
                                    >
                                        Security headers Override
                                    </Button>
                                    <p>Override default settings for security headers for this endpoint.</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {renderDialogInputs()}
                </CardContent>
            </Card>
        </div>
    );
};
