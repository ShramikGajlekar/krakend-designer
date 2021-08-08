import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BuildIcon from '@material-ui/icons/Build';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsIcon from '@material-ui/icons/Settings';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, { FunctionComponent, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export interface SidebarListProps {
    title: string;
    endpoints: string[];
    disabled?: boolean;
}

export interface SidebarListItem {
    title: string;
}

const SidebarList: FunctionComponent<SidebarListProps> = ({ title, endpoints, disabled }) => {
    const classes = useStyles();

    const [openEndpoints, setOpenEnpoints] = useState(false);
    const [openSecurityOptions, setOpenSecurityOptions] = useState(false);

    const toggleEndpointsVisiblilty = () => {
        setOpenEnpoints(!openEndpoints);
    };

    const toggleSecurityOptionsVisiblilty = () => {
        setOpenSecurityOptions(!openSecurityOptions);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {title}
                </ListSubheader>
            }
            className={classes.root}
        >
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button disabled={disabled}>
                <ListItemIcon>
                    <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Service Configuration" />
            </ListItem>
            <ListItem button disabled={disabled}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Service Discovery & Hosts" />
            </ListItem>
            <ListItem button disabled={disabled} onClick={toggleEndpointsVisiblilty}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Endpoints" />
                {openEndpoints ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openEndpoints} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {endpoints.map((endpoint) => (
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <AddCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={endpoint} />
                        </ListItem>
                    ))}

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add endpoint" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button disabled={disabled} onClick={toggleSecurityOptionsVisiblilty}>
                <ListItemIcon>
                    <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Security Options" />
                {openSecurityOptions ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSecurityOptions} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <LockOpenIcon />
                        </ListItemIcon>
                        <ListItemText primary="OAuth" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Security Headers" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button disabled={disabled}>
                <ListItemIcon>
                    <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Logging & Metrics" />
            </ListItem>
        </List>
    );
};

export default SidebarList;
