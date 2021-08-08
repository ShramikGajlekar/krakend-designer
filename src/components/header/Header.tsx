import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FunctionComponent } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
    }),
);

export interface HeaderProps {
    title?: string;
    logoURL?: string;
}

export const Header: FunctionComponent<HeaderProps> = ({ title, logoURL }) => {
    const classes = useStyles();
    return (
        <>
            <AppBar style={{ margin: 0 }} className={classes.appBar} position="fixed">
                <Toolbar>
                    <Box my={1} pl={0} mx={0}>
                        {logoURL ? <img className="" src={logoURL} height="35px" alt="logo" /> : title}
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
