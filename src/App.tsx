import { Box, CssBaseline } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/app-router/AppRouter';
import { HeaderProps } from './components/header/Header';
import SidebarLayout from './components/layout/SidebarLayout';
import { SidebarProps } from './components/sidebar/Sidebar';
import { sidebarEndpointItems } from './components/sidebar/SidebarList';
import { useAppSelector } from './store/hooks';
import { store } from './store/store';

function App(): JSX.Element {
    const headerOptions: HeaderProps = {
        logoURL: '/logo-white.png',
    };

    const sidebarOptions: SidebarProps = {
        sidebarListOptions: {
            title: 'Krakdend Designer',
            disabled: true,
        },
    };
    return (
        <Provider store={store}>
            <CssBaseline>
                <BrowserRouter>
                    <Box m={10} my={2} />
                    <SidebarLayout headerOptions={headerOptions} sidebarOptions={sidebarOptions}>
                        <AppRouter />
                        {/* <Box mt={4} pl={5} pr={5} style={{ minHeight: '90vh' }}> */}
                        {/* </Box> */}
                    </SidebarLayout>
                </BrowserRouter>
            </CssBaseline>
        </Provider>
    );
}

export default App;
