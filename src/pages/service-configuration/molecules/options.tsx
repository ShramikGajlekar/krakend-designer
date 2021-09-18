import {
    Box,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import React from 'react';
import { modifyOptions } from '../../../store/reducers/service-config/reducer';
import { Options } from '../../../store/reducers/service-config/interfaces';
import { changeTypeOptionsAllowNonRestResourceNaming, changeTypeOptionsEncoding, encodingOptions } from '../constants';
const useStyles = makeStyles((theme) => ({
    labelServiceName: {
        // minHeight: '200px',
        ...theme.typography.button,
        alignItems: 'left',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    card: {
        marginTop: theme.spacing(5),
    },
    cardTitle: {
        backgroundColor: '#5E6CA1',
        color: 'white',
    },
}));

// const serviceConfigState = useSelector((state) => state.serviceConfig);

export const OptionsCard = (): JSX.Element => {
    const classes = useStyles();

    const options = useAppSelector((state) => state.serviceConfig.options);

    const dispatch = useAppDispatch();

    const handleChangeOptions = (event: React.ChangeEvent<{ value: unknown }>, eventType: string) => {
        let changedHTTPOptions: Options = {
            outputEncoding: options?.outputEncoding,
            allowNonRest: options?.allowNonRest,
        };

        switch (eventType) {
            case changeTypeOptionsEncoding:
                changedHTTPOptions.outputEncoding = event.target.value as string;
                break;
            case changeTypeOptionsAllowNonRestResourceNaming:
                changedHTTPOptions.allowNonRest = !changedHTTPOptions.allowNonRest;
                break;
            default:
                return;
        }

        dispatch(modifyOptions(changedHTTPOptions));
    };

    return (
        <div>
            <Card className={classes.card} variant="outlined" style={{ boxShadow: '10px 0px 10px 0px grey' }}>
                <CardContent className={classes.cardTitle}>
                    <div className={classes.labelServiceName}>{'HTTP Server Settings'}</div>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item sm={12}>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                                style={{ minWidth: '100%' }}
                            >
                                <InputLabel id="options-output-encoding-label">Output Encoding</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="options-output-encoding-label"
                                    id="options-output-encoding-comp"
                                    value={options?.outputEncoding}
                                    onChange={(event) => handleChangeOptions(event, changeTypeOptionsEncoding)}
                                    label="Output Encoding"
                                >
                                    {encodingOptions.map((menuOption) => {
                                        return <MenuItem value={menuOption[1]}>{menuOption[0]}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <p style={{ marginLeft: '10px' }}>
                                Render register used <strong>by default</strong> to encode the output of KrakenD
                                endpoints. You can change this setting later per endpoint.
                            </p>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item sm={12} style={{ marginLeft: '10px' }}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={options?.allowNonRest}
                                            name="service-config-enable-https"
                                            onChange={(event) =>
                                                handleChangeOptions(event, changeTypeOptionsAllowNonRestResourceNaming)
                                            }
                                        />
                                    }
                                    label="Allow non-RESTful resource naming"
                                />
                            </FormGroup>
                            <p>
                                By default KrakenD only works with RESTful URL patterns against backends. Enable this
                                option if backends aren't RESTful, e.g.: <code>/url.{`{some_variable}`}.json</code>
                            </p>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};
