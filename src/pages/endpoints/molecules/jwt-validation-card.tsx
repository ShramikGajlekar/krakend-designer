import {
    CardContent,
    FormControlLabel,
    FormGroup,
    Grid,
    Card,
    Checkbox,
    Divider,
    TextField,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Chip,
    Input,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import _ from 'lodash';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deepClone } from '../../../util';
import {
    addAudience,
    addFingerprint,
    addRole,
    addScopes,
    removeAudience,
    removeFingerprint,
    removeRole,
    removeScopes,
    modifyCustomCiphers,
    modifyJWTValidation,
    modifyMatcher,
} from '../../../store/reducers/endpoints/reducer';
import {
    allowedCustomCiphers,
    changeTypeJWTValidationAlgorithm,
    changeTypeJWTValidationAudience,
    changeTypeJWTValidationCookieName,
    changeTypeJWTValidationDisableJWKSecurity,
    changeTypeJWTValidationEnable,
    changeTypeJWTValidationEnableCaching,
    changeTypeJWTValidationEnableCustomCipherSuites,
    changeTypeJWTValidationFingerPrints,
    changeTypeJWTValidationIssuer,
    changeTypeJWTValidationJWKURI,
    changeTypeJWTValidationMatcher,
    changeTypeJWTValidationRoles,
    changeTypeJWTValidationRolesKey,
    changeTypeJWTValidationScopes,
    changeTypeJWTValidationScopesKey,
    matcher,
} from '../constants';
import TextInputArray from '../../../components/ui-molecules/text-input-array';

interface IJWTValidationCardProps {
    endpointIndex: number;
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
        backgroundColor: '#5E6CA1',
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const getStyles = (item: string, list: string[], theme: Theme) => {
    return {
        fontWeight: list.indexOf(item) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
};

export const JWTValidationCard: React.FunctionComponent<IJWTValidationCardProps> = ({ endpointIndex }) => {
    const classes = useStyles();
    const theme = useTheme();
    const jwtValidation = useAppSelector((state) => state.endpoints[endpointIndex].jwtValidation);
    const dispatch = useAppDispatch();

    const handleChangeJWTValidation = (
        event: React.ChangeEvent<HTMLInputElement>,
        eventType: string,
        index: number,
    ) => {
        let changedJWTValidation = deepClone(jwtValidation);
        let list: string[] = [];

        switch (eventType) {
            case changeTypeJWTValidationEnable:
                changedJWTValidation.enable = event.target.checked;
                break;
            case changeTypeJWTValidationAlgorithm:
                changedJWTValidation.algorithm = event.target.value;
                break;
            case changeTypeJWTValidationJWKURI:
                changedJWTValidation.jwkURI = event.target.value;
                break;
            case changeTypeJWTValidationScopes:
                list = [...changedJWTValidation.scopesToValidate];
                list[index] = event.target.value;
                changedJWTValidation.scopesToValidate = list;
                break;
            case changeTypeJWTValidationMatcher:
                changedJWTValidation.matcher = event.target.value;
                break;
            case changeTypeJWTValidationScopesKey:
                changedJWTValidation.scopesKey = event.target.value;
                break;
            case changeTypeJWTValidationIssuer:
                changedJWTValidation.issuer = event.target.value;
                break;
            case changeTypeJWTValidationAudience:
                list = [...changedJWTValidation.audience];
                list[index] = event.target.value;
                changedJWTValidation.audience = list;
                break;
            case changeTypeJWTValidationRoles:
                list = [...changedJWTValidation.roles];
                list[index] = event.target.value;
                changedJWTValidation.roles = list;
                break;
            case changeTypeJWTValidationRolesKey:
                changedJWTValidation.rolesKey = event.target.value;
                break;
            case changeTypeJWTValidationCookieName:
                changedJWTValidation.cookieName = event.target.value;
                break;
            case changeTypeJWTValidationFingerPrints:
                list = [...changedJWTValidation.fingerPrints];
                list[index] = event.target.value;
                changedJWTValidation.fingerPrints = list;
                break;
            case changeTypeJWTValidationEnableCustomCipherSuites:
                changedJWTValidation.customCipherSuites.enabled = event.target.checked;
                break;
            case changeTypeJWTValidationEnableCaching:
                changedJWTValidation.enableCaching = event.target.checked;
                break;
            case changeTypeJWTValidationDisableJWKSecurity:
                changedJWTValidation.disableJWKSecurity = event.target.checked;
                break;

            default:
                break;
        }

        dispatch(modifyJWTValidation({ endpointIndex: endpointIndex, jwtValidation: changedJWTValidation }));
    };

    const handleChangeJWTValidationMatcher = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(modifyMatcher({ endpointIndex: endpointIndex, matcher: event.target.value as string }));
    };

    const handleAddMoreScopes = () => {
        dispatch(addScopes({ endpointIndex: endpointIndex, param: '' }));
    };

    const handleRemoveScopes = (index: number) => {
        dispatch(removeScopes({ endpointIndex: endpointIndex, paramIndex: index }));
    };

    const handleAddMoreAudience = () => {
        dispatch(addAudience({ endpointIndex: endpointIndex, param: '' }));
    };

    const handleRemoveAudience = (index: number) => {
        dispatch(removeAudience({ endpointIndex: endpointIndex, paramIndex: index }));
    };

    const handleAddMoreRoles = () => {
        dispatch(addRole({ endpointIndex: endpointIndex, param: '' }));
    };

    const handleRemoveRole = (index: number) => {
        dispatch(removeRole({ endpointIndex: endpointIndex, paramIndex: index }));
    };

    const handleAddMoreFingerprints = () => {
        dispatch(addFingerprint({ endpointIndex: endpointIndex, param: '' }));
    };

    const handleRemoveFingerprint = (index: number) => {
        dispatch(removeFingerprint({ endpointIndex: endpointIndex, paramIndex: index }));
    };

    const handleChangeCustomeCipherSuites = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(modifyCustomCiphers({ endpointIndex: endpointIndex, customCiphers: event.target.value as string[] }));
    };

    const renderInputs = (): JSX.Element => {
        if (jwtValidation.enable) {
            return (
                <CardContent>
                    <Grid container spacing={2}>
                        <p>
                            Only the <strong>algorithm</strong> and the location of your <strong>jwk</strong> are
                            mandatory fields.
                        </p>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={jwtValidation.algorithm}
                                fullWidth
                                type="text"
                                id="bot-detector-cache-size"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTValidation(event, changeTypeJWTValidationAlgorithm, 0)
                                }
                                placeholder="RS266"
                                label="Algorithm"
                            />
                        </Grid>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={jwtValidation.jwkURI}
                                fullWidth
                                type="text"
                                id="bot-detector-cache-size"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTValidation(event, changeTypeJWTValidationJWKURI, 0)
                                }
                                placeholder="https://issuer.com/.well-known/jwks.json"
                                label="JWKS URI"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem} sm={4}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeTypeJWTValidationScopes}
                                arr={jwtValidation.scopesToValidate}
                                label={'Scopes to validate'}
                                name="jwt-validation-scopes-to-validate"
                                placeholder="scope_name"
                                handleChangeArrayState={handleChangeJWTValidation}
                                handleRemoveElementInArray={handleRemoveScopes}
                                handleAddMoreElementInArray={handleAddMoreScopes}
                                disable={(): boolean => {
                                    return _.last(jwtValidation?.scopesToValidate)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        jwtValidation?.scopesToValidate[index]?.length === 0 ||
                                        jwtValidation?.scopesToValidate.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                        </Grid>
                        <Grid item className={classes.gridItem} sm={1}>
                            {''}
                        </Grid>
                        <Grid item className={classes.gridItem} sm={2}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id={'jwt-validation-matcher' + endpointIndex}> Matcher</InputLabel>
                                <Select
                                    labelId={'jwt-validation-matcher' + endpointIndex}
                                    name="jwt-validation-matcher"
                                    value={jwtValidation.matcher}
                                    label="Method"
                                    onChange={handleChangeJWTValidationMatcher}
                                >
                                    {matcher.map((m) => (
                                        <MenuItem key={'methods' + m[1]} value={m[0]}>
                                            {m[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={1}>
                            {''}
                        </Grid>
                        <Grid item className={classes.gridItem} sm={4}>
                            <TextField
                                value={jwtValidation.scopesKey}
                                fullWidth
                                type="text"
                                name="jwt-validation-scopes-key"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTValidation(event, changeTypeJWTValidationScopesKey, 0)
                                }
                                placeholder="scope"
                                label="Scopes Key"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem} sm={12}>
                            <TextField
                                className={classes.gridItem}
                                value={jwtValidation.issuer}
                                fullWidth
                                type="text"
                                name="jwt-validation-iss"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTValidation(event, changeTypeJWTValidationIssuer, 0)
                                }
                                placeholder="scope"
                                label="Issuer"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeTypeJWTValidationAudience}
                                arr={jwtValidation.audience}
                                label={'Audience'}
                                name="jwt-validation-audience"
                                placeholder="aud"
                                handleChangeArrayState={handleChangeJWTValidation}
                                handleRemoveElementInArray={handleRemoveAudience}
                                handleAddMoreElementInArray={handleAddMoreAudience}
                                disable={(): boolean => {
                                    return _.last(jwtValidation?.audience)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        jwtValidation?.audience[index]?.length === 0 ||
                                        jwtValidation?.audience.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                        </Grid>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeTypeJWTValidationRoles}
                                arr={jwtValidation.roles}
                                label={'Scopes to validate'}
                                name="jwt-validation-scopes-to-validate"
                                placeholder="scope_name"
                                handleChangeArrayState={handleChangeJWTValidation}
                                handleRemoveElementInArray={handleRemoveRole}
                                handleAddMoreElementInArray={handleAddMoreRoles}
                                disable={(): boolean => {
                                    return _.last(jwtValidation?.roles)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        jwtValidation?.roles[index]?.length === 0 || jwtValidation?.roles.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={jwtValidation.rolesKey}
                                fullWidth
                                type="text"
                                name="jwt-validation-roles-key"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTValidation(event, changeTypeJWTValidationRolesKey, 0)
                                }
                                placeholder="roles"
                                label="Roles"
                            />
                        </Grid>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={jwtValidation.cookieName}
                                fullWidth
                                type="text"
                                name="jwt-validation-cookie-name"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTValidation(event, changeTypeJWTValidationCookieName, 0)
                                }
                                placeholder="cookie-name"
                                label="Cookie Name"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem} sm={12}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeTypeJWTValidationFingerPrints}
                                arr={jwtValidation.fingerPrints}
                                label={'Fingerprints'}
                                name="jwt-validation-fingerprints"
                                placeholder="fingerprints"
                                handleChangeArrayState={handleChangeJWTValidation}
                                handleRemoveElementInArray={handleRemoveFingerprint}
                                handleAddMoreElementInArray={handleAddMoreFingerprints}
                                disable={(): boolean => {
                                    return _.last(jwtValidation?.fingerPrints)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        jwtValidation?.fingerPrints[index]?.length === 0 ||
                                        jwtValidation?.fingerPrints.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem} sm={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jwtValidation.customCipherSuites.enabled}
                                            name="endpoint-jwt-custom-cipher-enable"
                                            onChange={(event) =>
                                                handleChangeJWTValidation(
                                                    event,
                                                    changeTypeJWTValidationEnableCustomCipherSuites,
                                                    0,
                                                )
                                            }
                                        />
                                    }
                                    label="Allow Custom Cipher Suites"
                                />
                            </FormGroup>
                        </Grid>
                        {jwtValidation.customCipherSuites.enabled ? (
                            <Grid item className={classes.gridItem} sm={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id={'custom-cipher-label' + endpointIndex}>Allowed Methods</InputLabel>
                                    <Select
                                        labelId={'custom-cipher-label' + endpointIndex}
                                        id={'custom-ciphers' + endpointIndex}
                                        multiple
                                        fullWidth={true}
                                        value={jwtValidation.customCipherSuites.customCiphers}
                                        onChange={handleChangeCustomeCipherSuites}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {(selected as string[]).map((value) => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {allowedCustomCiphers.map((cipher) => (
                                            <MenuItem
                                                key={'ciphers' + cipher[1]}
                                                value={cipher[0]}
                                                style={getStyles(
                                                    cipher[0],
                                                    jwtValidation.customCipherSuites.customCiphers,
                                                    theme,
                                                )}
                                            >
                                                {cipher[1]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jwtValidation.enableCaching}
                                            name="endpoint-jwt-validation-enable-caching"
                                            onChange={(event) =>
                                                handleChangeJWTValidation(
                                                    event,
                                                    changeTypeJWTValidationEnableCaching,
                                                    0,
                                                )
                                            }
                                        />
                                    }
                                    label="Enable Caching"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jwtValidation.enableCaching}
                                            name="endpoint-jwt-validation-disable-jwk-security"
                                            onChange={(event) =>
                                                handleChangeJWTValidation(
                                                    event,
                                                    changeTypeJWTValidationDisableJWKSecurity,
                                                    0,
                                                )
                                            }
                                        />
                                    }
                                    label="Disable JWK security"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
            );
        } else {
            return <></>;
        }
    };
    return (
        <div>
            <Card className={classes.card} variant="outlined" style={{ boxShadow: '10px 0px 10px 0px grey' }}>
                <CardContent className={classes.cardTitle}>
                    <Grid container spacing={1} direction="row" alignItems="flex-start" justifyContent="center">
                        <Grid item sm={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jwtValidation.enable}
                                            name="endpoint-jwt-validation-enable"
                                            onChange={(event) =>
                                                handleChangeJWTValidation(event, changeTypeJWTValidationEnable, 0)
                                            }
                                        />
                                    }
                                    label="Enable JWT Validation"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
                {renderInputs()}
                <Divider />
            </Card>
        </div>
    );
};
