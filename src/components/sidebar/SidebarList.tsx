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
import { Link } from 'react-router-dom';
import { allowedMethods, encodingOptions } from '../../pages/service-configuration/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { EndpointInfo } from '../../store/reducers/endpoints/interfaces';
import { addEndpoints } from '../../store/reducers/endpoints/reducer';

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

enum SidebarItemsEnum {
    DASHBOARD = 'Dashboard',
    SERVICE_CONFIG = 'Service Configuration',
    SERVICE_DISCOVERY = 'Service Discovery & Hosts',
    ENDPOINTS = 'Endpoints',
    SECURITY_OPTIONS = 'Security Options',
    OAUTH = 'OAuth',
    SECURITY_HEADERS = 'Security Headers',
    LOGGING_METRICS = 'Logging & Metrics',
}

export interface SidebarListProps {
    title?: string;
    disabled?: boolean;
}

export interface sidebarEndpointItems {
    endpoint: string;
    method: string;
    index: number;
}

export interface SidebarListItem {
    title: string;
}

const SidebarList: FunctionComponent<SidebarListProps> = ({ title, disabled }): JSX.Element => {
    const classes = useStyles();

    const [openEndpoints, setOpenEnpoints] = useState(false);
    const [openSecurityOptions, setOpenSecurityOptions] = useState(false);

    let eps = useAppSelector((state) => state.endpoints);

    const prepareEnpointProp = (): sidebarEndpointItems[] => {
        let endpointOptions: sidebarEndpointItems[] = [];
        if (eps != undefined && eps.length > 0) {
            eps.map((e, index) => {
                endpointOptions.push({
                    endpoint: e.endpoint,
                    method: e.method,
                    index: index,
                });
            });
        }
        return endpointOptions;
    };

    let endpoints = prepareEnpointProp();

    let dispatch = useAppDispatch();
    const toggleEndpointsVisiblilty = (): void => {
        setOpenEnpoints(!openEndpoints);
    };

    const toggleSecurityOptionsVisiblilty = (): void => {
        setOpenSecurityOptions(!openSecurityOptions);
    };

    const handleAddEndpoint = () => {
        let endpoint: EndpointInfo = {
            endpoint: '/new-endpoint',
            method: allowedMethods[0][1],
            output: encodingOptions[0][1],
            recognizedQueryString: [''],
            rateLimiting: {
                enabled: false,
                rateLimit: 0,
                defaultUserQuota: 0,
            },
            customCombiner: '',
            concurrentCalls: 0,
            headers: [''],
            timeoutAndCacheTTL: {
                timeout: '0s',
                cacheTTL: '0s',
            },
            jwtValidation: {
                enable: false,
                algorithm: '',
                jwkURI: '',
                scopesToValidate: [''],
                matcher: 'None',
                scopesKey: '',
                issuer: '',
                audience: [''],
                roles: [''],
                rolesKey: '',
                cookieName: '',
                fingerPrints: [''],
                customCipherSuites: {
                    enabled: false,
                    customCiphers: [],
                },
                enableCaching: false,
                disableJWKSecurity: false,
            },
            jwtSigning: {
                enable: false,
                algorithm: '',
                jwkURI: '',
                keysToSign: [''],
                keyID: '',
                customCipherSuites: {
                    enabled: false,
                    customCiphers: [],
                },
                fingerPrints: [''],
                disableJWKSecurity: false,
                fullSerialization: false,
            },
            enableSequentialProxy: false,
            backendEndpoint: [],
            stubResponse: {
                response: '',
                strategy: '',
            },
        };
        dispatch(addEndpoints(endpoint));
    };

    const subheader = (
        <ListSubheader component="div" key="nested-list-subheader">
            {title}
        </ListSubheader>
    );

    return (
        <List
            key="sidebar"
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={subheader}
            className={classes.root}
        >
            <ListItem button key={SidebarItemsEnum.DASHBOARD}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={SidebarItemsEnum.DASHBOARD} />
            </ListItem>
            <ListItem button key={SidebarItemsEnum.SERVICE_CONFIG}>
                <ListItemIcon>
                    <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={SidebarItemsEnum.SERVICE_CONFIG} />
            </ListItem>
            <ListItem button key={SidebarItemsEnum.SERVICE_DISCOVERY} disabled={disabled}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={SidebarItemsEnum.SERVICE_DISCOVERY} />
            </ListItem>

            <ListItem button key={SidebarItemsEnum.ENDPOINTS} onClick={toggleEndpointsVisiblilty}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={SidebarItemsEnum.ENDPOINTS} />
                {openEndpoints ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openEndpoints} timeout="auto" unmountOnExit>
                <List key="endpoint" component="div" disablePadding>
                    {endpoints.map((endpoint) => (
                        <ListItem key={endpoint.index + endpoint.endpoint} button className={classes.nested}>
                            <ListItemIcon>
                                <AddCircleIcon />
                            </ListItemIcon>
                            <Link to={'/endpoints/' + endpoint.index}>
                                ({endpoint.method}) {endpoint.endpoint}
                            </Link>
                        </ListItem>
                    ))}
                    <ListItem key="add-endpoint" button className={classes.nested} onClick={handleAddEndpoint}>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add endpoint" />
                    </ListItem>
                </List>
            </Collapse>

            <ListItem
                button
                key={SidebarItemsEnum.SECURITY_OPTIONS}
                disabled={disabled}
                onClick={toggleSecurityOptionsVisiblilty}
            >
                <ListItemIcon>
                    <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary={SidebarItemsEnum.SECURITY_OPTIONS} />
                {openSecurityOptions ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSecurityOptions} timeout="auto" unmountOnExit>
                <List key={SidebarItemsEnum.SECURITY_OPTIONS} component="div" disablePadding>
                    <ListItem key={SidebarItemsEnum.OAUTH} button className={classes.nested}>
                        <ListItemIcon>
                            <LockOpenIcon />
                        </ListItemIcon>
                        <ListItemText primary={SidebarItemsEnum.OAUTH} />
                    </ListItem>
                    <ListItem key={SidebarItemsEnum.SECURITY_HEADERS} button className={classes.nested}>
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary={SidebarItemsEnum.SECURITY_HEADERS} />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem key={SidebarItemsEnum.LOGGING_METRICS} button disabled={disabled}>
                <ListItemIcon>
                    <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary={SidebarItemsEnum.LOGGING_METRICS} />
            </ListItem>
        </List>
    );
};

export default SidebarList;
