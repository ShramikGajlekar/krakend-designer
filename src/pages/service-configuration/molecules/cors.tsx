import React from 'react';
import {
    Divider,
    Grid,
    FormControlLabel,
    FormGroup,
    Checkbox,
    TextField,
    Chip,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
    changeTypeCorsAllowedOrigins,
    changeTypeCorsAllowedHeaders,
    changeTypeCorsExposedHeaders,
    changeTypeCorsMaxAge,
    changeTypeCorsAllowCredentials,
    changeTypeCorsEnableCors,
    allowedMethods,
} from '../constants';
import {
    modifyCorsConfig,
    addCorsAllowedOrigins,
    removeCorsAllowedOrigins,
    addCorsAllowedHeaders,
    removeCorsAllowedHeaders,
    addCorsExposeHeaders,
    removeCorsExposeHeaders,
} from '../../../store/reducers/service-config/reducer';
import { Cors } from '../../../store/reducers/service-config/interfaces';
import TextInputArray from '../../../components/ui-molecules/text-input-array';
import { deepClone } from '../../../util';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
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

export const CorsCard = (): JSX.Element => {
    const theme = useTheme();

    const classes = useStyles();

    const corsConfig = useAppSelector((state) => state.serviceConfig.cors);

    const dispatch = useAppDispatch();

    const handleAddMoreAllowedHeader = () => {
        dispatch(addCorsAllowedHeaders(''));
    };

    const handleRemoveAllowedHeader = (index: number) => {
        dispatch(removeCorsAllowedHeaders(index));
    };

    const handleAddMoreAllowedOrigin = () => {
        dispatch(addCorsAllowedOrigins(''));
    };

    const handleRemoveAllowedOrigin = (index: number) => {
        dispatch(removeCorsAllowedOrigins(index));
    };

    const handleAddMoreExposedHeader = () => {
        dispatch(addCorsExposeHeaders(''));
    };

    const handleRemoveExposedHeader = (index: number) => {
        dispatch(removeCorsExposeHeaders(index));
    };

    const handleChangeAllowedMethods = (event: React.ChangeEvent<{ value: unknown }>) => {
        let corsConfigChanged: Cors = {
            enableCors: corsConfig.enableCors,
            allowCredentials: corsConfig.allowCredentials,
            allowedHeaders: corsConfig.allowedHeaders,
            allowedMethods: corsConfig.allowedMethods,
            allowedOrigins: corsConfig.allowedOrigins,
            maxAge: corsConfig.maxAge,
            exposeHeaders: corsConfig.exposeHeaders,
        };
        corsConfigChanged.allowedMethods = event.target.value as string[];
        dispatch(modifyCorsConfig(corsConfigChanged));
    };

    const handleChangeCorsConfig = (event: React.ChangeEvent<HTMLInputElement>, eventType: string, index: number) => {
        let corsConfigChanged = deepClone(corsConfig);
        let list: string[] = [];

        switch (eventType) {
            case changeTypeCorsAllowedOrigins:
                list = [...corsConfig.allowedOrigins];
                list[index] = event.target.value;
                corsConfigChanged.allowedOrigins = list;
                break;
            case changeTypeCorsAllowedHeaders:
                list = [...corsConfig.allowedHeaders];
                list[index] = event.target.value;
                corsConfigChanged.allowedHeaders = list;
                break;
            case changeTypeCorsExposedHeaders:
                list = [...corsConfig.exposeHeaders];
                list[index] = event.target.value;
                corsConfigChanged.exposeHeaders = list;
                break;
            case changeTypeCorsMaxAge:
                corsConfigChanged.maxAge = event.target.value;
                break;
            case changeTypeCorsAllowCredentials:
                corsConfigChanged.allowCredentials = event.target.checked;
                break;
            case changeTypeCorsEnableCors:
                corsConfigChanged.enableCors = event.target.checked;
                break;
            default:
                break;
        }
        dispatch(modifyCorsConfig(corsConfigChanged));
    };

    const renderAllowedMethods = (): JSX.Element => {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id="allowed-methods-label">Allowed Methods</InputLabel>
                <Select
                    labelId="allowed-methods-label"
                    id="allowed-methods"
                    multiple
                    fullWidth={true}
                    value={corsConfig.allowedMethods}
                    onChange={handleChangeAllowedMethods}
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
                    {allowedMethods.map((method) => (
                        <MenuItem
                            key={'methods' + method[1]}
                            value={method[0]}
                            style={getStyles(method[0], corsConfig.allowedMethods, theme)}
                        >
                            {method[1]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

    const renderAllowedOrigins = (): JSX.Element => {
        return (
            <TextInputArray
                inputType="text"
                changeType={changeTypeCorsAllowedOrigins}
                label={'Allowed Origin'}
                arr={corsConfig.allowedOrigins}
                name="cors-allowed-origins"
                placeholder="https://example.com"
                handleChangeArrayState={handleChangeCorsConfig}
                handleRemoveElementInArray={handleRemoveAllowedOrigin}
                handleAddMoreElementInArray={handleAddMoreAllowedOrigin}
                disable={(): boolean => {
                    return _.last(corsConfig.allowedOrigins)?.length === 0;
                }}
                disableRemove={(index: number): boolean => {
                    return corsConfig.allowedOrigins[index]?.length === 0 || corsConfig.allowedOrigins.length <= 1;
                }}
                viewAddMoreButton={true}
            />
        );
    };

    const renderAllowedHeaders = (): JSX.Element => {
        return (
            <TextInputArray
                inputType="text"
                changeType={changeTypeCorsAllowedHeaders}
                label={'Allowed Headers'}
                arr={corsConfig.allowedHeaders}
                name="cors-allowed-headers"
                placeholder="eg. Accept-Language"
                handleChangeArrayState={handleChangeCorsConfig}
                handleRemoveElementInArray={handleRemoveAllowedHeader}
                handleAddMoreElementInArray={handleAddMoreAllowedHeader}
                disable={(): boolean => {
                    return _.last(corsConfig.allowedHeaders)?.length === 0;
                }}
                disableRemove={(index: number): boolean => {
                    return corsConfig.allowedHeaders[index]?.length === 0 || corsConfig.allowedHeaders.length <= 1;
                }}
                viewAddMoreButton={true}
            />
        );
    };

    const renderExposedHeaders = (): JSX.Element => {
        return (
            <TextInputArray
                inputType="text"
                changeType={changeTypeCorsExposedHeaders}
                label={'Exposed Headers'}
                arr={corsConfig.exposeHeaders}
                name="cors-allowed-headers"
                placeholder="eg. Accept-Language"
                handleChangeArrayState={handleChangeCorsConfig}
                handleRemoveElementInArray={handleRemoveExposedHeader}
                handleAddMoreElementInArray={handleAddMoreExposedHeader}
                disable={(): boolean => {
                    return _.last(corsConfig.exposeHeaders)?.length === 0;
                }}
                disableRemove={(index: number): boolean => {
                    return corsConfig.exposeHeaders[index]?.length === 0 || corsConfig.exposeHeaders.length <= 1;
                }}
                viewAddMoreButton={true}
            />
        );
    };

    const renderAllowedCredentials = (): JSX.Element => {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={corsConfig.allowCredentials}
                            name="cors-allow-creds"
                            onChange={(event) => handleChangeCorsConfig(event, changeTypeCorsAllowCredentials, 0)}
                        />
                    }
                    label="Allow Credentials"
                />
            </FormGroup>
        );
    };

    const renderMaxAge = (): JSX.Element => {
        return (
            <TextField
                value={corsConfig.maxAge}
                fullWidth
                id="cors-allow-max-age"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeCorsConfig(event, changeTypeCorsAllowCredentials, 0)
                }
                variant="outlined"
                placeholder="12h"
                label="Max Age"
            />
        );
    };

    const renderInputs = (): JSX.Element => {
        if (corsConfig.enableCors) {
            return (
                <CardContent>
                    <Grid container spacing={4} direction="row" alignItems="flex-start" justifyContent="flex-start">
                        <Grid
                            item
                            sm={12}
                            style={{
                                borderStyle: 'solid',
                                borderColor: 'rgba(0, 0, 0, 0.12)',
                                borderTop: '1px',
                                borderLeft: '1px',
                                borderRight: '1px',
                                marginBottom: '0px',
                            }}
                        >
                            <p>Select which methods would be allowed</p>
                            {renderAllowedMethods()}
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            style={{
                                marginTop: '20px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(0, 0, 0, 0.12)',
                                borderTop: '1px',
                                borderLeft: '1px',
                                borderRight: '1px',
                                marginBottom: '0px',
                            }}
                        >
                            {renderAllowedOrigins()}
                            <p>
                                Add those origins you would like to accept. Or use <code>*</code> for any origin.
                            </p>
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            style={{
                                marginTop: '20px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(0, 0, 0, 0.12)',
                                borderTop: '1px',
                                borderLeft: '1px',
                                borderRight: '1px',
                                marginBottom: '0px',
                            }}
                        >
                            {renderAllowedHeaders()}
                            <p>Only the headers added here will be allowed</p>
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            style={{
                                marginTop: '20px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(0, 0, 0, 0.12)',
                                borderTop: '1px',
                                borderLeft: '1px',
                                borderRight: '1px',
                                marginBottom: '0px',
                            }}
                        >
                            {renderExposedHeaders()}
                            <p>Headers that are safe to expose to the API of a CORS API specification</p>
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            style={{
                                marginTop: '20px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(0, 0, 0, 0.12)',
                                borderTop: '1px',
                                borderLeft: '1px',
                                borderRight: '1px',
                                marginBottom: '0px',
                            }}
                        >
                            {renderAllowedCredentials()}
                            <p>
                                When requests can include user credentials like cookies, HTTP authentication or client
                                side SSL certificates
                            </p>
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            style={{
                                marginTop: '20px',
                            }}
                        >
                            {renderMaxAge()}
                            <p>For how long the response can be cached</p>
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
                                            checked={corsConfig.enableCors}
                                            name="service-config-enable-cors"
                                            onChange={(event) =>
                                                handleChangeCorsConfig(event, changeTypeCorsEnableCors, 0)
                                            }
                                        />
                                    }
                                    label="Enable CORS"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                {renderInputs()}
            </Card>
        </div>
    );
};
