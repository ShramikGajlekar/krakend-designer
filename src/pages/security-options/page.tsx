import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { OAuthSettingsCard } from './molecules';

export const SecurityOptionsPage = () => {
    return (
        <div>
            <Grid container spacing={4} direction="row" alignItems="flex-start" justify="center">
                <Grid item sm={12}>
                    <OAuthSettingsCard />
                </Grid>
                <Grid item sm={12}></Grid>
            </Grid>
        </div>
    );
};
