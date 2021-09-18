import Grid from '@material-ui/core/Grid';
import React from 'react';
import { ETCDMiddlewareCard } from './molecules';
import { AvailableHostsCard } from '../service-configuration/molecules';
export const ServiceDiscoveryPage = (): JSX.Element => {
    return (
        <div>
            <Grid container spacing={4} direction="row" alignItems="flex-start" justify="center">
                <Grid item sm={6}>
                    <AvailableHostsCard />
                </Grid>
                <Grid item sm={6}>
                    <ETCDMiddlewareCard />
                </Grid>
            </Grid>
        </div>
    );
};
