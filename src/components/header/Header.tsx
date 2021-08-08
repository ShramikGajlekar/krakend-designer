import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FunctionComponent } from 'react';

export interface HeaderProps {
    title?: string;
    logo?: string;
}

export const Header: FunctionComponent<HeaderProps> = ({ title }) => {
    return (
        <>
            <AppBar style={{ margin: 0 }} position="static">
                <Toolbar>
                    <Box my={1} pl={0} mx={0}>
                        {title && title}
                        {!title && <img className="" src="/logo-white.png" height="35px" alt="logo" />}
                    </Box>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button size="large" color="inherit">
                            Tab1
                        </Button>
                        <Button size="large" color="inherit">
                            Tab2
                        </Button>
                        <Button size="large" color="inherit">
                            Tab3
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};
