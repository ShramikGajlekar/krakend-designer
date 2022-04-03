import { Card, CardContent, Divider, FormControlLabel, FormGroup, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { WhiteCheckbox } from '../../../components/ui-molecules/checkbox-flavors';
import { useAppSelector } from '../../../store/hooks';
import { updateSecurityHeaders } from '../../../store/reducers/security-options/reducer';
import { SecurityHeadersChangeType } from '../constants';

interface ISecurityHeadersCardProps {}

function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

const useStyles = makeStyles((theme) => ({
    labelServiceName: {
        // minHeight: '200px',
        ...theme.typography.button,
        alignItems: 'left',
    },
    card: {
        marginTop: theme.spacing(5),
    },
    cardTitle: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
    removeButton: {
        marginTop: '25%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    button: {
        margin: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    gridItem: {
        marginTop: '2%',
    },
}));

export const SecurityHeadersCard: React.FunctionComponent<ISecurityHeadersCardProps> = (props) => {
    const securityHeaders = useAppSelector((state) => state.securityOptions.securityHeaders);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChangeSecurityHeaders = (
        event: React.ChangeEvent<HTMLInputElement>,
        eventType: SecurityHeadersChangeType,
    ): void => {
        const securityHeadersUpdated = deepClone(securityHeaders);
        const { valueAsNumber, value, checked } = event.target;
        switch (eventType) {
            case SecurityHeadersChangeType.ForceSSL:
                securityHeadersUpdated.sslOptions.forceSSL = checked;
                break;
            case SecurityHeadersChangeType.SSLHost:
                securityHeadersUpdated.sslOptions.sslHost = value;
                break;
            case SecurityHeadersChangeType.Port:
                securityHeadersUpdated.sslOptions.port = valueAsNumber;
                break;
            case SecurityHeadersChangeType.SSLCertPath:
                securityHeadersUpdated.sslCertificate = value;
                break;
            case SecurityHeadersChangeType.SSLCertPrivKey:
                securityHeadersUpdated.sslPrivateKey = value;
                break;
            case SecurityHeadersChangeType.HSTSMaxAge:
                securityHeadersUpdated.maxAge = valueAsNumber;
                break;
            case SecurityHeadersChangeType.IncludeAlsoSubdomains:
                securityHeadersUpdated.includeSubdomains = checked;
                break;
            case SecurityHeadersChangeType.ClickJackingValue:
                securityHeadersUpdated.clickJacking.value = value;
                break;
            case SecurityHeadersChangeType.PublicKeyPins:
                securityHeadersUpdated.publicKeyPins = value;
                break;
            case SecurityHeadersChangeType.EnableMimeSniffPrevention:
                securityHeadersUpdated.mimeSniffPrevention = checked;
                break;
            case SecurityHeadersChangeType.EnableXSSFilter:
                securityHeadersUpdated.xssProtection.enableBrowserXSSFilter = checked;
                break;
            case SecurityHeadersChangeType.CSP:
                securityHeadersUpdated.xssProtection.csp = value;
                break;
            default:
                break;
        }
        dispatch(updateSecurityHeaders(securityHeadersUpdated));
    };

    const RenderInput: JSX.Element = (
        <CardContent>
            <Grid container spacing={2}>
                <Grid item sm={2}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <WhiteCheckbox
                                    checked={securityHeaders.sslOptions.forceSSL}
                                    name="security-headers-forcessl"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        handleChangeSecurityHeaders(event, SecurityHeadersChangeType.ForceSSL)
                                    }
                                />
                            }
                            label="Force SSL"
                        />
                    </FormGroup>
                </Grid>
                <Grid item sm={7}>
                    <TextField
                        className={classes.gridItem}
                        value={securityHeaders.sslOptions.sslHost}
                        fullWidth
                        type="text"
                        name="security-headers-sslhost"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeSecurityHeaders(event, SecurityHeadersChangeType.SSLHost)
                        }
                        placeholder="ssl.host.domain"
                        label="Host"
                    />
                    <p>The Client secret as it will provided to the Auth server</p>
                </Grid>
                <Grid item sm={7}>
                    <TextField
                        className={classes.gridItem}
                        value={securityHeaders.sslOptions.port}
                        fullWidth
                        type="number"
                        name="security-headers-port"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeSecurityHeaders(event, SecurityHeadersChangeType.SSLHost)
                        }
                        placeholder="ssl.host.domain"
                        label="Port"
                    />
                    <p>The Client secret as it will provided to the Auth server</p>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <TextField
                        className={classes.gridItem}
                        value={securityHeaders.sslCertificate}
                        fullWidth
                        type="text"
                        name="security-headers-ssl-certificate"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeSecurityHeaders(event, SecurityHeadersChangeType.SSLCertPath)
                        }
                        placeholder="https://issuer.com/oauth2/token"
                        label="Token URL"
                    />
                    <p>The URL where the negotiation of the token will happen</p>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        className={classes.gridItem}
                        value={securityHeaders.sslPrivateKey}
                        fullWidth
                        type="text"
                        name="security-headers-ssl-private-key"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeSecurityHeaders(event, SecurityHeadersChangeType.SSLCertPrivKey)
                        }
                        placeholder="scope1,scope2"
                        label="Scopes"
                    />
                    <p>Comma separated list of scopes needed</p>
                </Grid>
            </Grid>
        </CardContent>
    );

    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardTitle}>
                    <Grid container spacing={1} direction="row" alignItems="flex-start" justifyContent="center">
                        <Grid item sm={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <WhiteCheckbox
                                            checked={securityHeaders.enableHTTPMiddleware}
                                            name="security-headers"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                handleChangeSecurityHeaders(event, SecurityHeadersChangeType.EnableHTTP)
                                            }
                                        />
                                    }
                                    label="Enable OAuth2"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
                {securityHeaders.enableHTTPMiddleware && RenderInput}
                <Divider />
            </Card>
        </div>
    );
};
