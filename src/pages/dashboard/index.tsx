import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ServiceCard from '../../components/service-card/ServiceCard';

const Dashboard = (): JSX.Element => {
    return (
        <div>
            <Grid container spacing={4} direction="row" alignItems="flex-start" justify="center">
                <Grid item sm={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                Creating your first service?
                            </Typography>
                            <Divider />
                            <Typography variant="body1" component="p">
                                Hi, thanks for using the KrakenDesigner. This application creates the configuration that
                                the KrakenD service loads.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" component="label">
                                Create Configuration
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                Load a previous configuration file
                            </Typography>
                            <Divider />
                            <Typography variant="body1" component="p">
                                Drag and drop a previous configuration file below to resume a configuration. After
                                reviewing the values press the button to load it in the application. Only{' '}
                                <code> application/json</code> file type is accepted by the KrakenDesigner.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" component="label">
                                Upload File
                                <input type="file" hidden />
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={4} direction="row" alignItems="flex-start" justify="flex-start">
                <Grid item sm={3}>
                    <ServiceCard />
                </Grid>
                <Grid item sm={3}>
                    <ServiceCard />
                </Grid>
                <Grid item sm={3}>
                    <ServiceCard />
                </Grid>
                <Grid item sm={3}>
                    <ServiceCard />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
