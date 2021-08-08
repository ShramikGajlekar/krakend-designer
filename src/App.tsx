import { CssBaseline } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Layout, LayoutProps } from './components/layout/Layout';

function App(): JSX.Element {
    const layoutOptions: LayoutProps = {
        headerOptions: {
            logo: '/logo-white.png',
        },
    };
    return (
        <CssBaseline>
            <Layout headerOptions={layoutOptions.headerOptions}>
                <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '90vh' }}>
                    <Grid item xl={3}>
                        <Typography variant="h3">component here</Typography>
                    </Grid>
                </Grid>
            </Layout>
        </CssBaseline>
    );
}

export default App;
