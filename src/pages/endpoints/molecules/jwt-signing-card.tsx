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
import { JWTSigning } from '../../../store/reducers/endpoints/interfaces';
import {
    addSigningKey,
    removeSigningKey,
    modifyJWTSigning,
    modifyCustomCiphersJWTSigning,
    removeFingerprintJWTSigning,
    addFingerprintJWTSigning,
} from '../../../store/reducers/endpoints/reducer';
import {
    changeTypeJWTSigningEnable,
    changeTypeJWTSigningJWKURI,
    changeTypeJWTSigningAlgorithm,
    changeTypeJWTSigningKeysToSign,
    changeTypeJWTSigningKeyID,
    changeTypeJWTSigningEnableCustomCipherSuite,
    changeTypeJWTSigningCustomCipherSuite,
    changeTypeJWTSigningFingerprints,
    changeTypeJWTSigningFullSerialization,
    changeTypeJWTSigningDisableJWKSecurity,
    allowedCustomCiphers,
} from '../constants';
import TextInputArray from '../../../components/ui-molecules/text-input-array';
import { WhiteCheckbox } from '../../../components/ui-molecules/checkbox-flavors';

interface IJWTSigningCardProps {
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

export const JWTSigningCard: React.FunctionComponent<IJWTSigningCardProps> = ({ endpointIndex }) => {
    const classes = useStyles();
    const theme = useTheme();
    const jwtSigning = useAppSelector((state) => state.endpoints[endpointIndex].jwtSigning);
    const dispatch = useAppDispatch();

    const handleChangeJWTSigning = (event: React.ChangeEvent<HTMLInputElement>, eventType: string, index: number) => {
        let changedJWTsigning: JWTSigning = JSON.parse(JSON.stringify(jwtSigning));
        let list: string[] = [];

        let { value, checked } = event.target;

        switch (eventType) {
            case changeTypeJWTSigningEnable:
                changedJWTsigning.enable = checked;
                break;
            case changeTypeJWTSigningJWKURI:
                changedJWTsigning.jwkURI = value;
                break;
            case changeTypeJWTSigningAlgorithm:
                changedJWTsigning.algorithm = value;
                break;
            case changeTypeJWTSigningKeysToSign:
                list = [...changedJWTsigning.keysToSign];
                list[index] = value;
                changedJWTsigning.keysToSign = list;
                break;
            case changeTypeJWTSigningKeyID:
                changedJWTsigning.keyID = value;
                break;
            case changeTypeJWTSigningEnableCustomCipherSuite:
                changedJWTsigning.customCipherSuites.enabled = checked;
                break;
            case changeTypeJWTSigningFingerprints:
                list = [...changedJWTsigning.fingerPrints];
                list[index] = value;
                changedJWTsigning.fingerPrints = list;
                break;
            case changeTypeJWTSigningFullSerialization:
                changedJWTsigning.fullSerialization = checked;
                break;
            case changeTypeJWTSigningDisableJWKSecurity:
                changedJWTsigning.disableJWKSecurity = checked;
                break;
            default:
                break;
        }

        dispatch(modifyJWTSigning({ endpointIndex: endpointIndex, jwtSigning: changedJWTsigning }));
    };

    const handleAddMoreFingerprints = () => {
        dispatch(addFingerprintJWTSigning({ endpointIndex: endpointIndex, param: '' }));
    };

    const handleRemoveFingerprint = (index: number) => {
        dispatch(removeFingerprintJWTSigning({ endpointIndex: endpointIndex, paramIndex: index }));
    };

    const handleAddMoreKeysToSign = () => {
        dispatch(addSigningKey({ endpointIndex: endpointIndex, param: '' }));
    };

    const handleRemoveKeysToSign = (index: number) => {
        dispatch(removeSigningKey({ endpointIndex: endpointIndex, paramIndex: index }));
    };

    const handleChangeCustomeCipherSuites = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(
            modifyCustomCiphersJWTSigning({
                endpointIndex: endpointIndex,
                customCiphers: event.target.value as string[],
            }),
        );
    };

    const renderInputs = (): JSX.Element => {
        if (jwtSigning.enable) {
            return (
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={jwtSigning.algorithm}
                                fullWidth
                                type="text"
                                id="jwt-signing-algorithn"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTSigning(event, changeTypeJWTSigningAlgorithm, 0)
                                }
                                placeholder="RS266"
                                label="Algorithm"
                            />
                            <p>Digital signatures and MACs algorithm</p>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={jwtSigning.jwkURI}
                                fullWidth
                                type="text"
                                id="jwt-signing-jwk-uri"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTSigning(event, changeTypeJWTSigningJWKURI, 0)
                                }
                                placeholder="https://issuer.com/.well-known/jwks.json"
                                label="JWKS URI"
                            />
                            <p>The URL to your JWK endpoint with the set of private keys used to sign the token</p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeTypeJWTSigningKeysToSign}
                                arr={jwtSigning.keysToSign}
                                label={'Keys To Sign'}
                                name="jwt-signing-keys-to-sign"
                                placeholder="key"
                                handleChangeArrayState={handleChangeJWTSigning}
                                handleRemoveElementInArray={handleRemoveKeysToSign}
                                handleAddMoreElementInArray={handleAddMoreKeysToSign}
                                disable={(): boolean => {
                                    return _.last(jwtSigning?.keysToSign)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        jwtSigning?.keysToSign[index]?.length === 0 ||
                                        jwtSigning?.keysToSign.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                            <p>List of specific keys needing signing</p>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={6}>
                            <TextField
                                value={jwtSigning.keyID}
                                fullWidth
                                type="text"
                                name="jwt-signing-key-id"
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeJWTSigning(event, changeTypeJWTSigningKeyID, 0)
                                }
                                placeholder="key_id"
                                label="Key ID"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item className={classes.gridItem} sm={12}>
                            <TextInputArray
                                inputType="text"
                                changeType={changeTypeJWTSigningFingerprints}
                                arr={jwtSigning.fingerPrints}
                                label={'Fingerprints'}
                                name="jwt-signing-fingerprints"
                                placeholder="e.g: S3Jha2VuRCBpcyB0aGUgYmVzdCBnYXRld2F5LCBhbmQgeW91IGtub3cgaXQ=="
                                handleChangeArrayState={handleChangeJWTSigning}
                                handleRemoveElementInArray={handleRemoveFingerprint}
                                handleAddMoreElementInArray={handleAddMoreFingerprints}
                                disable={(): boolean => {
                                    return _.last(jwtSigning?.fingerPrints)?.length === 0;
                                }}
                                disableRemove={(index: number): boolean => {
                                    return (
                                        jwtSigning?.fingerPrints[index]?.length === 0 ||
                                        jwtSigning?.fingerPrints.length <= 1
                                    );
                                }}
                                viewAddMoreButton={true}
                            />
                            <p>
                                All fingerprints <strong>must be in base64</strong>
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item className={classes.gridItem} sm={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jwtSigning.customCipherSuites.enabled}
                                            name="endpoint-jwt-custom-cipher-enable"
                                            onChange={(event) =>
                                                handleChangeJWTSigning(
                                                    event,
                                                    changeTypeJWTSigningEnableCustomCipherSuite,
                                                    0,
                                                )
                                            }
                                        />
                                    }
                                    label="Allow Custom Cipher Suites"
                                />
                            </FormGroup>
                        </Grid>
                        {jwtSigning.customCipherSuites.enabled ? (
                            <Grid item sm={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id={'custom-cipher-label' + endpointIndex}>Ciphers</InputLabel>
                                    <Select
                                        labelId={'custom-cipher-label' + endpointIndex}
                                        id={'custom-ciphers' + endpointIndex}
                                        multiple
                                        fullWidth={true}
                                        value={jwtSigning.customCipherSuites.customCiphers}
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
                                                    jwtSigning.customCipherSuites.customCiphers,
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
                        <p>
                            Overrides the default cipher suites. Unless you have your own legacy JWK you don't need to
                            choose anything here
                        </p>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item className={classes.gridItem} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jwtSigning.fullSerialization}
                                            name="endpoint-jwt-signing-enable-full-serialization"
                                            onChange={(event) =>
                                                handleChangeJWTSigning(event, changeTypeJWTSigningFullSerialization, 0)
                                            }
                                        />
                                    }
                                    label="Enable Caching"
                                />
                            </FormGroup>
                            <p>Use JSON format instead of the compact form JWT is giving</p>
                        </Grid>
                        <Grid item className={classes.gridItem} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jwtSigning.disableJWKSecurity}
                                            name="endpoint-jwt-signing-disable-jwk-security"
                                            onChange={(event) =>
                                                handleChangeJWTSigning(event, changeTypeJWTSigningDisableJWKSecurity, 0)
                                            }
                                        />
                                    }
                                    label="Disable JWK security"
                                />
                            </FormGroup>
                            <p>When you are using an insecure connection (plain http)</p>
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
            <Card className={classes.card}>
                <CardContent className={classes.cardTitle}>
                    <Grid container spacing={1} direction="row" alignItems="flex-start" justifyContent="center">
                        <Grid item sm={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <WhiteCheckbox
                                            checked={jwtSigning.enable}
                                            name="endpoint-jwt-signing-enable"
                                            onChange={(event) =>
                                                handleChangeJWTSigning(event, changeTypeJWTSigningEnable, 0)
                                            }
                                        />
                                    }
                                    label="Enable JWT Signing"
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
