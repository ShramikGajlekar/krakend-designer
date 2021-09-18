import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import React from 'react';
import { modifyServiceName } from '../../../store/reducers/service-config/reducer';

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
}));

// const serviceConfigState = useSelector((state) => state.serviceConfig);

export const ServiceNameCard = (): JSX.Element => {
    const classes = useStyles();

    const serviceName = useAppSelector((state) => state.serviceConfig.serviceName);

    const dispatch = useAppDispatch();

    const handleServiceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(modifyServiceName(event.target.value));
    };

    return (
        <div>
            <Card className={classes.card} variant="outlined" style={{ boxShadow: '10px 0px 10px 0px grey' }}>
                <CardContent className={classes.cardTitle}>
                    <div className={classes.labelServiceName}>{'Service Name'}</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <TextField
                        value={serviceName}
                        fullWidth
                        id="service-name-input"
                        variant="outlined"
                        onChange={handleServiceNameChange}
                        placeholder="Name of your service"
                    />
                </CardContent>
            </Card>
        </div>
    );
};
