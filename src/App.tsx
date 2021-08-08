import { Box, CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/app-router/AppRouter';
import { HeaderProps } from './components/header/Header';
import SidebarLayout from './components/layout/SidebarLayout';
import { SidebarProps } from './components/sidebar/Sidebar';

function App(): JSX.Element {
    const headerOptions: HeaderProps = {
        logoURL: '/logo-white.png',
    };

    const sidebarOptions: SidebarProps = {
        sidebarListOptions: {
            title: 'Krakdend Designer',
            endpoints: ['endpoint 1', 'endpoint2', 'endpoint3'],
            disabled: true,
        },
    };

    return (
        <CssBaseline>
            <BrowserRouter>
                <Box m={10} />
                <SidebarLayout headerOptions={headerOptions} sidebarOptions={sidebarOptions}>
                    <AppRouter />
                    {/* <Box mt={4} pl={5} pr={5} style={{ minHeight: '90vh' }}> */}
                    {/* </Box> */}
                </SidebarLayout>
            </BrowserRouter>
        </CssBaseline>
    );
}

export default App;
