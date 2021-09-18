import React from 'react';
import { Grid, FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
    changeETCDMiddlewareAvailableETCDMachines,
    changeETCDMiddlewareDialTimeout,
    changeETCDMiddlewareDialKeepAlive,
    changeETCDMiddlewareTimeOutPerReq,
    changeETCDMiddlewareCaCert,
    changeETCDMiddlewareCert,
    changeETCDMiddlewarePrivKey,
    changeTypeETCDMiddlewareEnable,
} from '../constants';
import {
    modifyETCDMiddleware,
    addETCDMachines,
    removeETCDMachines,
} from '../../../store/reducers/service-discovery/reducer';
import { ETCDMiddleware } from '../../../store/reducers/service-discovery/interfaces';
import TextInputArray from '../../../components/ui-molecules/text-input-array';
import { WhiteCheckbox } from '../../../components/ui-molecules/checkbox-flavors';

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
        color: 'white',
    },
    removeButton: {
        marginTop: '25%',
    },
}));

export const ETCDMiddlewareCard = (): JSX.Element => {
    const classes = useStyles();

    const etcdMiddleware = useAppSelector((state) => state.serviceDiscovery.etcdMiddleware);

    const dispatch = useAppDispatch();

    const handleAddMoreMachines = () => {
        dispatch(addETCDMachines(''));
    };

    const handleRemoveMachines = (index: number) => {
        dispatch(removeETCDMachines(index));
    };

    const handleChangeETCDMiddleware = (
        event: React.ChangeEvent<HTMLInputElement>,
        eventType: string,
        index: number,
    ) => {
        let changedETCDMiddleware: ETCDMiddleware = {
            enable: etcdMiddleware.enable,
            availableETCDMachines: etcdMiddleware.availableETCDMachines,
            dialTimeOut: etcdMiddleware.dialTimeOut,
            dialKeepAlive: etcdMiddleware.dialKeepAlive,
            timeOutPerReq: etcdMiddleware.timeOutPerReq,
            certificate: etcdMiddleware.certificate,
            privKey: etcdMiddleware.privKey,
            caCert: etcdMiddleware.caCert,
        };
        let list: string[] = [];

        switch (eventType) {
            case changeTypeETCDMiddlewareEnable:
                changedETCDMiddleware.enable = event.target.checked;
                break;
            case changeETCDMiddlewareAvailableETCDMachines:
                list = [...etcdMiddleware.availableETCDMachines];
                list[index] = event.target.value;
                changedETCDMiddleware.availableETCDMachines = list;
                break;
            case changeETCDMiddlewareDialTimeout:
                changedETCDMiddleware.dialTimeOut = event.target.value;
                break;
            case changeETCDMiddlewareDialKeepAlive:
                changedETCDMiddleware.dialKeepAlive = event.target.value;
                break;
            case changeETCDMiddlewareTimeOutPerReq:
                changedETCDMiddleware.timeOutPerReq = event.target.value;
                break;
            case changeETCDMiddlewareCaCert:
                changedETCDMiddleware.caCert = event.target.value;
                break;
            case changeETCDMiddlewareCert:
                changedETCDMiddleware.certificate = event.target.value;
                break;
            case changeETCDMiddlewarePrivKey:
                changedETCDMiddleware.privKey = event.target.value;
                break;
            default:
                break;
        }
        dispatch(modifyETCDMiddleware(changedETCDMiddleware));
    };

    const renderETCDMachines = (): JSX.Element => {
        return (
            <TextInputArray
                inputType="text"
                changeType={changeETCDMiddlewareAvailableETCDMachines}
                arr={etcdMiddleware.availableETCDMachines}
                label={'Available ETCD Machines'}
                name="etcd-middleware-available-etcd-machines"
                placeholder="http(s)://hostname[:port]"
                handleChangeArrayState={handleChangeETCDMiddleware}
                handleRemoveElementInArray={handleRemoveMachines}
                handleAddMoreElementInArray={handleAddMoreMachines}
                disable={(): boolean => {
                    return _.last(etcdMiddleware.availableETCDMachines)?.length === 0;
                }}
                disableRemove={(index: number): boolean => {
                    return (
                        etcdMiddleware.availableETCDMachines[index]?.length === 0 ||
                        etcdMiddleware.availableETCDMachines.length <= 1
                    );
                }}
                viewAddMoreButton={true}
            />
        );
    };

    const renderDialTimeout = (): JSX.Element => {
        return (
            <TextField
                value={etcdMiddleware.dialTimeOut}
                fullWidth
                id="bot-detector-cache-size"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeETCDMiddleware(event, changeETCDMiddlewareDialTimeout, 0)
                }
                placeholder="5s"
                label="Dial Timeout"
            />
        );
    };

    const renderDialKeepAlive = (): JSX.Element => {
        return (
            <TextField
                value={etcdMiddleware.dialKeepAlive}
                fullWidth
                id="bot-detector-cache-size"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeETCDMiddleware(event, changeETCDMiddlewareDialKeepAlive, 0)
                }
                placeholder="30s"
                label="Dial Keep Alive"
            />
        );
    };
    const renderTimeOutPerRequest = (): JSX.Element => {
        return (
            <TextField
                value={etcdMiddleware.timeOutPerReq}
                fullWidth
                id="bot-detector-cache-size"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeETCDMiddleware(event, changeETCDMiddlewareTimeOutPerReq, 0)
                }
                placeholder="1s"
                label="Timeout per Request"
            />
        );
    };

    const renderCaCert = (): JSX.Element => {
        return (
            <TextField
                value={etcdMiddleware.caCert}
                fullWidth
                id="bot-detector-cache-size"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeETCDMiddleware(event, changeETCDMiddlewareCaCert, 0)
                }
                placeholder="/path/to/file"
                label="CA Certificate"
            />
        );
    };

    const renderCert = (): JSX.Element => {
        return (
            <TextField
                value={etcdMiddleware.certificate}
                fullWidth
                id="bot-detector-cache-size"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeETCDMiddleware(event, changeETCDMiddlewareCert, 0)
                }
                placeholder="/path/to/file"
                label="Certificate"
            />
        );
    };

    const renderPrivKey = (): JSX.Element => {
        return (
            <TextField
                value={etcdMiddleware.privKey}
                fullWidth
                id="bot-detector-cache-size"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeETCDMiddleware(event, changeETCDMiddlewarePrivKey, 0)
                }
                placeholder="/path/to/file"
                label="Private Key"
            />
        );
    };

    const renderInputs = (): JSX.Element => {
        if (etcdMiddleware.enable) {
            return (
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            sm={12}
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
                            {renderETCDMachines()}
                            <p>ETCD servers you want KrakenD to make use of for host resolution</p>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        sm={12}
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
                        {renderDialTimeout()}
                        <p>Dial timeout includes name resolution.</p>
                    </Grid>
                    <Grid
                        item
                        sm={12}
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
                        {renderDialKeepAlive()}
                        <p>
                            KeepAlive specifies the keep-alive period for an active network connection. If zero,
                            keep-alives are not enabled.
                        </p>
                    </Grid>
                    <Grid
                        item
                        sm={12}
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
                        {renderTimeOutPerRequest()}
                        <p>Header sent to determine the maximum timeout per request</p>
                    </Grid>
                    <Grid
                        item
                        sm={12}
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
                        {renderCaCert()}
                        <p>Absolute path to the CA Cert.</p>
                    </Grid>
                    <Grid
                        item
                        sm={12}
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
                        {renderCert()}
                        <p>An array with all the regular expressions that define bots. Matching bots are rejected.</p>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        {renderPrivKey()}
                        <p>An array with all the regular expressions that define bots. Matching bots are rejected.</p>
                    </Grid>
                </CardContent>
            );
        } else {
            return <></>;
        }
    };

    return (
        <div>
            <Card className={classes.card} variant="outlined" style={{ boxShadow: '10px 0px 10px 0px grey' }}>
                <CardContent className={classes.cardTitle}>
                    <Grid container spacing={1} direction="row" alignItems="flex-start" justifyContent="center">
                        <Grid item sm={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <WhiteCheckbox
                                            checked={etcdMiddleware.enable}
                                            name="service-discovery-enable-etcd-middleware"
                                            onChange={(event) =>
                                                handleChangeETCDMiddleware(event, changeTypeETCDMiddlewareEnable, 0)
                                            }
                                        />
                                    }
                                    label="ETCD Middleware"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
                {renderInputs()}
            </Card>
        </div>
    );
};
