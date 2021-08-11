import React from 'react';
import {
    Divider,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Box,
    Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
    staticAddressRolution,
    dnsSrv,
    etcd,
    customServiceDiscovery,
    changeTypeHostInfoSanitize,
    changeTypeHostInfoAddress,
} from '../constants';
import {
    addHostInfo,
    modifyAvailableHostsServiceDiscovery,
    modifyHostInfo,
    removeHostInfo,
} from '../../../store/reducers/service-config/reducer';
import { HostInfo, ModifyHostInfoPayload } from '../../../store/reducers/service-config/interfaces';

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
}));

export const AvailableHostsCard = (): JSX.Element => {
    const classes = useStyles();

    const serviceAvaialbleHosts = useAppSelector((state) => state.serviceConfig.availableHosts);

    const dispatch = useAppDispatch();

    const handleRadioOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(modifyAvailableHostsServiceDiscovery(event.target.value));
    };

    const handleAddMoreHostInfo = () => {
        let hostInfo: HostInfo = { hostAddress: '', disableSanitize: false };
        dispatch(addHostInfo(hostInfo));
    };
    const handleRemoveHostInfo = (index: number) => {
        dispatch(removeHostInfo(index));
    };

    const handleChangeHostInfo = (event: React.ChangeEvent<HTMLInputElement>, eventType: string, index: number) => {
        console.log('here');
        let hostInfo = Object.assign({}, serviceAvaialbleHosts.hosts[index]);
        let modifyRequest: ModifyHostInfoPayload = {
            hostAddress: hostInfo.hostAddress,
            disableSanitize: hostInfo.disableSanitize,
            index: index,
        };
        switch (eventType) {
            case changeTypeHostInfoAddress:
                modifyRequest.hostAddress = event.target.value;
                break;
            case changeTypeHostInfoSanitize:
                modifyRequest.disableSanitize = event.target.checked;
                break;
            default:
                return;
        }
        dispatch(modifyHostInfo(modifyRequest));
    };
    return (
        <div>
            <Card className={classes.card} variant="outlined" style={{ boxShadow: '10px 0px 10px 0px grey' }}>
                <CardContent className={classes.cardTitle}>
                    <div className={classes.labelServiceName}>{'Available Hosts'}</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <p>
                        Add here all the addresses used by KrakenD to retrieve the data and if they are resolved by a
                        <b> service discovery:</b>
                    </p>
                    <br />
                    <RadioGroup aria-label="" onChange={handleRadioOptionChange}>
                        <Grid container spacing={4} direction="row" alignItems="flex-start" justify="center">
                            <Grid item sm={6}>
                                <FormControlLabel
                                    value={staticAddressRolution}
                                    control={<Radio />}
                                    label="Static address resolution"
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <FormControlLabel value={etcd} control={<Radio />} label="Etcd" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4} direction="row" alignItems="flex-start" justify="center">
                            <Grid item sm={6}>
                                <FormControlLabel value={dnsSrv} control={<Radio />} label="DNS SRV (e.g: k8s)" />
                            </Grid>
                            <Grid item sm={6}>
                                <FormControlLabel
                                    value={customServiceDiscovery}
                                    control={<Radio />}
                                    label="Custom service discovery"
                                />
                            </Grid>
                        </Grid>
                    </RadioGroup>
                    <br></br>
                    {serviceAvaialbleHosts.hosts.map((host, index) => {
                        return (
                            <>
                                <Grid
                                    key={'hosts-' + index.toString()}
                                    container
                                    spacing={1}
                                    direction="row"
                                    alignItems="flex-start"
                                >
                                    <Grid item sm={4}>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={host.disableSanitize}
                                                        name="disable-sanitize"
                                                        onChange={(event) =>
                                                            handleChangeHostInfo(
                                                                event,
                                                                changeTypeHostInfoSanitize,
                                                                index,
                                                            )
                                                        }
                                                    />
                                                }
                                                label="disable-sanitize"
                                            />
                                        </FormGroup>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField
                                            fullWidth
                                            value={host.hostAddress}
                                            id="host-address-input"
                                            variant="outlined"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                handleChangeHostInfo(event, changeTypeHostInfoAddress, index)
                                            }
                                            label="address"
                                        />
                                    </Grid>
                                    <Grid item sm={1}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            disabled={
                                                serviceAvaialbleHosts.hosts[index]?.hostAddress.length === 0 ||
                                                serviceAvaialbleHosts.hosts.length <= 1
                                            }
                                            className={classes.removeButton}
                                            onClick={() => handleRemoveHostInfo(index)}
                                        >
                                            X
                                        </Button>
                                    </Grid>
                                </Grid>
                                <br></br>
                            </>
                        );
                    })}
                    <Grid container spacing={4} direction="row" alignItems="flex-start">
                        <Grid item sm={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                disabled={_.last(serviceAvaialbleHosts.hosts)?.hostAddress.length === 0}
                                onClick={handleAddMoreHostInfo}
                            >
                                +
                            </Button>
                        </Grid>
                    </Grid>
                    <p>
                        The address where KrakenD connects to. Some valid examples can be <strong>https://myapi</strong>
                        , <strong>amqp://host</strong>, <strong>192.0.2.1:25</strong>, <strong>my.service.tld.</strong>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
