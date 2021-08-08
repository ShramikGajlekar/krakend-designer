import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { FunctionComponent } from 'react';
import { Header, HeaderProps } from '../header/Header';

const useStyles = makeStyles({
    container: {
        margin: '0',
        padding: '0',
    },
});

export interface LayoutProps {
    headerOptions: HeaderProps;
}

export const Layout: FunctionComponent<LayoutProps> = ({ headerOptions, children }) => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth={false} className={classes.container}>
                <Header title={headerOptions.title} logoURL={headerOptions.logoURL} />
                {children}
            </Container>
        </>
    );
};
