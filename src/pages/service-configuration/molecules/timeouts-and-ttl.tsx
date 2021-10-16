import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import React from 'react';
import { modifyTimeoutsAndTTL } from '../../../store/reducers/service-config/reducer';
import { TimeOutsAndTTL } from '../../../store/reducers/service-config/interfaces';
import { changeTypeBackendTimeOut, changeTypeDefaultCacheTTL } from '../constants';
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

export const TimeOutTTLCard = (): JSX.Element => {
    const classes = useStyles();

    const timeoutsTTL = useAppSelector((state) => state.serviceConfig.timeoutsAndTTL);

    const dispatch = useAppDispatch();

    const handleBackendTimeout = (event: React.ChangeEvent<HTMLInputElement>, eventType: string) => {
        let changedTimeOutTTL: TimeOutsAndTTL = {
            backendTimeOut: timeoutsTTL?.backendTimeOut,
            defaultCacheTTL: timeoutsTTL?.defaultCacheTTL,
        };

        switch (eventType) {
            case changeTypeBackendTimeOut:
                changedTimeOutTTL.backendTimeOut = event.target.value;
                break;
            case changeTypeDefaultCacheTTL:
                changedTimeOutTTL.defaultCacheTTL = event.target.value;
                break;
            default:
                return;
        }
        dispatch(modifyTimeoutsAndTTL(changedTimeOutTTL));
    };

    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardTitle}>
                    <div className={classes.labelServiceName}>{'Timeouts and TTL'}</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <p>All settings below are used across all backends unless overridden explicitly in each endpoint</p>
                </CardContent>
                <CardContent>
                    <TextField
                        value={timeoutsTTL?.backendTimeOut}
                        fullWidth
                        id="service-config-backend-timeout"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleBackendTimeout(event, changeTypeBackendTimeOut)
                        }
                        label="Backend Timeout"
                    />
                    <p>
                        Default timeout for all connections against your backends, including the time spent in the whole
                        pipe. This value can be overridden later on specific endpoints.
                    </p>
                </CardContent>
                <CardContent>
                    <TextField
                        value={timeoutsTTL?.defaultCacheTTL}
                        fullWidth
                        id="service-config-default-cache-timeout"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleBackendTimeout(event, changeTypeDefaultCacheTTL)
                        }
                        label="Default Cache TTL"
                    />
                    Value must be an integer expressing the number of seconds
                </CardContent>
                <CardContent>
                    The time the service considers the origin is still valid. Applies to GET requests only. The service
                    does not cache anything but expedites the headers for proxies to do the caching (e.g., a Varnish
                    server).
                </CardContent>
            </Card>
        </div>
    );
};
