import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { Header, HeaderProps } from '../header/Header';
import Sidebar, { SidebarProps } from '../sidebar/Sidebar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export interface SideBarLayoutProps {
    headerOptions: HeaderProps;
    sidebarOptions: SidebarProps;
}

const SidebarLayout: FunctionComponent<SideBarLayoutProps> = ({ headerOptions, sidebarOptions, children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header title={headerOptions.title} logoURL={headerOptions.logoURL} />
            <Sidebar sidebarListOptions={sidebarOptions.sidebarListOptions} />
            <main className={classes.content}>{children}</main>
        </div>
    );
};

export default SidebarLayout;
