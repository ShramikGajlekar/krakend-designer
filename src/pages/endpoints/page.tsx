import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { EndpointCard, JWTSigningCard } from './molecules';
import { useParams } from 'react-router-dom';

export const EndpointConfigPage = () => {
    let { endpointIndex } = useParams<{ endpointIndex: string }>();
    return (
        <div>
            <Grid container spacing={4} direction="row" alignItems="flex-start" justify="center">
                <Grid item sm={12}>
                    <EndpointCard endpointIndex={parseInt(endpointIndex)} />
                </Grid>
                <Grid item sm={6}>
                    <JWTSigningCard endpointIndex={parseInt(endpointIndex)} />
                </Grid>
                <Grid item sm={6}></Grid>
            </Grid>
        </div>
    );
};
