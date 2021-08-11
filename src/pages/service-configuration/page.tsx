import Grid from '@material-ui/core/Grid';
import React from 'react';
import {
    AvailableHostsCard,
    HTTPServerSettingsCard,
    HTTPClientSettingsCard,
    OptionsCard,
    ServiceNameCard,
    TimeOutTTLCard,
    BotDetectorCard,
    CorsCard,
} from './molecules';
export const ServiceConfigPage = (): JSX.Element => {
    return (
        <div>
            <Grid container spacing={4} direction="row" alignItems="flex-start" justify="center">
                <Grid item sm={6}>
                    <ServiceNameCard />
                    <AvailableHostsCard />
                    <TimeOutTTLCard />
                    <CorsCard />
                </Grid>
                <Grid item sm={6}>
                    <HTTPServerSettingsCard />
                    <OptionsCard />
                    <BotDetectorCard />
                </Grid>
            </Grid>
            <Grid container spacing={4} direction="row" alignItems="flex-start">
                <Grid item sm={12}>
                    <HTTPClientSettingsCard />
                </Grid>
            </Grid>
        </div>
    );
};
