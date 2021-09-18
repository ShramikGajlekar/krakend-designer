import { Card, CardContent, Divider, FormControlLabel, FormGroup, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { WhiteCheckbox } from '../../../components/ui-molecules/checkbox-flavors';
import { useAppSelector } from '../../../store/hooks';
import { updateOAuthSetting } from '../../../store/reducers/security-options/reducer';
import { OauthSettingsChangeType } from '../constants';

interface IOAuthSettingsCardProps {}

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

export const OAuthSettingsCard: React.FunctionComponent<IOAuthSettingsCardProps> = (props) => {
    const oAuthSetting = useAppSelector((state) => state.securityOptions.oauthSetting);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChangeOAuthSetting = (
        event: React.ChangeEvent<HTMLInputElement>,
        eventType: OauthSettingsChangeType,
    ): void => {
        const oAuthSettingsUpdated = deepClone(oAuthSetting);
        const { value, checked } = event.target;
        switch (eventType) {
            case OauthSettingsChangeType.ClientID:
                oAuthSettingsUpdated.clientID = value;
                break;
            case OauthSettingsChangeType.ClientSecret:
                oAuthSettingsUpdated.clientSecret = value;
                break;
            case OauthSettingsChangeType.EnableOauth:
                oAuthSettingsUpdated.enableOauth = checked;
                break;
            case OauthSettingsChangeType.Scopes:
                oAuthSettingsUpdated.scopes = value;
                break;
            case OauthSettingsChangeType.TokenURL:
                oAuthSettingsUpdated.tokenURL = value;
                break;
            default:
                break;
        }
        dispatch(updateOAuthSetting(oAuthSettingsUpdated));
    };

    const RenderInput: JSX.Element = (
        <CardContent>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <TextField
                        className={classes.gridItem}
                        value={oAuthSetting.clientID}
                        fullWidth
                        type="text"
                        name="security-opts-oauth-client-id"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeOAuthSetting(event, OauthSettingsChangeType.ClientID)
                        }
                        placeholder="f4f97084-edf1-4692-9f39-f9a8514e8858"
                        label="Client ID"
                    />
                    <p>The Client ID as it will provided to the Auth server</p>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        className={classes.gridItem}
                        value={oAuthSetting.clientSecret}
                        fullWidth
                        type="text"
                        name="security-opts-oauth-client-secret"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeOAuthSetting(event, OauthSettingsChangeType.ClientSecret)
                        }
                        placeholder="f4f97084f9a8514e8858"
                        label="Client Secret"
                    />
                    <p>The Client secret as it will provided to the Auth server</p>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <TextField
                        className={classes.gridItem}
                        value={oAuthSetting.tokenURL}
                        fullWidth
                        type="text"
                        name="security-opts-oauth-token-url"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeOAuthSetting(event, OauthSettingsChangeType.TokenURL)
                        }
                        placeholder="https://issuer.com/oauth2/token"
                        label="Token URL"
                    />
                    <p>The URL where the negotiation of the token will happen</p>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        className={classes.gridItem}
                        value={oAuthSetting.scopes}
                        fullWidth
                        type="text"
                        name="security-opts-oauth-client-id"
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleChangeOAuthSetting(event, OauthSettingsChangeType.Scopes)
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
                                            checked={oAuthSetting.enableOauth}
                                            name="security-opts-oauth-enable"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                handleChangeOAuthSetting(event, OauthSettingsChangeType.EnableOauth)
                                            }
                                        />
                                    }
                                    label="Enable OAuth2"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
                {oAuthSetting.enableOauth && RenderInput}
                <Divider />
            </Card>
        </div>
    );
};
