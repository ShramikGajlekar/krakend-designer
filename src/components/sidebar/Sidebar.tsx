import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FunctionComponent } from 'react';
import SidebarList, { SidebarListProps } from './SidebarList';

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            // height: 'calc(100% - 200px)',
            // top: 200,
        },
        drawerContainer: {
            overflow: 'auto',
        },
    }),
);

export interface SidebarProps {
    sidebarListOptions: SidebarListProps;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ sidebarListOptions }): JSX.Element => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <SidebarList
                    title={sidebarListOptions.title}
                    endpoints={sidebarListOptions.endpoints}
                    disabled={sidebarListOptions.disabled}
                />
            </div>
        </Drawer>
    );
};

export default Sidebar;
