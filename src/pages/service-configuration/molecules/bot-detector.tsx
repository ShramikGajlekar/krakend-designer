import React from 'react';
import {
    Divider,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Box,
    Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
    changeTypeBotDetectorEnable,
    changeTypeBotDetectorWhiteList,
    changeTypeBotDetectorBlackList,
    changeTypeBotDetectorPatterns,
    changeTypeBotDetectorCacheSize,
} from '../constants';
import {
    addBotDetectorBlackListInfo,
    addBotDetectorPatternsInfo,
    addBotDetectorWhiteListInfo,
    modifyBotDetector,
    removeBotDetectorBlackListInfo,
    removeBotDetectorPatternsInfo,
    removeBotDetectorWhiteListInfo,
} from '../../../store/reducers/service-config/reducer';
import { BotDetector } from '../../../store/reducers/service-config/interfaces';
import TextInputArray from '../../../components/ui-molecules/text-input-array';

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
}));

export const BotDetectorCard = (): JSX.Element => {
    const classes = useStyles();

    const botDetector = useAppSelector((state) => state.serviceConfig.botDetector);

    const dispatch = useAppDispatch();

    const handleAddMoreWhiteList = () => {
        dispatch(addBotDetectorWhiteListInfo(''));
    };

    const handleRemoveWhiteList = (index: number) => {
        dispatch(removeBotDetectorWhiteListInfo(index));
    };

    const handleAddMoreBlackList = () => {
        dispatch(addBotDetectorBlackListInfo(''));
    };

    const handleRemoveBlackList = (index: number) => {
        dispatch(removeBotDetectorBlackListInfo(index));
    };

    const handleAddMorePattern = () => {
        dispatch(addBotDetectorPatternsInfo(''));
    };

    const handleRemovePattern = (index: number) => {
        dispatch(removeBotDetectorPatternsInfo(index));
    };

    const handleChangeBotDetector = (event: React.ChangeEvent<HTMLInputElement>, eventType: string, index: number) => {
        let changedBotDetetctor: BotDetector = {
            enable: botDetector.enable,
            whitelist: botDetector.whitelist,
            blacklist: botDetector.blacklist,
            patterns: botDetector.patterns,
            cacheSize: botDetector.cacheSize,
        };
        let list: string[] = [];

        switch (eventType) {
            case changeTypeBotDetectorEnable:
                changedBotDetetctor.enable = event.target.checked;
                break;
            case changeTypeBotDetectorWhiteList:
                list = [...changedBotDetetctor.whitelist];
                list[index] = event.target.value;
                changedBotDetetctor.whitelist = list;
                break;
            case changeTypeBotDetectorBlackList:
                list = [...changedBotDetetctor.blacklist];
                list[index] = event.target.value;
                changedBotDetetctor.blacklist = list;
                break;
            case changeTypeBotDetectorPatterns:
                list = [...changedBotDetetctor.patterns];
                list[index] = event.target.value;
                changedBotDetetctor.patterns = list;
                break;
            case changeTypeBotDetectorCacheSize:
                changedBotDetetctor.cacheSize = event.target.valueAsNumber;
                break;
            default:
                break;
        }
        dispatch(modifyBotDetector(changedBotDetetctor));
    };

    const renderWhiteList = (): JSX.Element => {
        return (
            <TextInputArray
                inputType="text"
                changeType={changeTypeBotDetectorWhiteList}
                label={'White List'}
                arr={botDetector.whitelist}
                name="bot-detector-white-list"
                placeholder="MyAndroidClient/1.0"
                handleChangeArrayState={handleChangeBotDetector}
                handleRemoveElementInArray={handleRemoveWhiteList}
                handleAddMoreElementInArray={handleAddMoreWhiteList}
                disable={(): boolean => {
                    return _.last(botDetector.whitelist)?.length === 0;
                }}
                disableRemove={(index: number): boolean => {
                    return botDetector.whitelist[index]?.length === 0 || botDetector.whitelist.length <= 1;
                }}
                viewAddMoreButton={true}
            />
        );
    };

    const renderBlackList = (): JSX.Element => {
        return (
            <TextInputArray
                inputType="text"
                changeType={changeTypeBotDetectorBlackList}
                arr={botDetector.blacklist}
                label={'Black List'}
                name="bot-detector-black-list"
                placeholder="axios/0.17.1"
                handleChangeArrayState={handleChangeBotDetector}
                handleRemoveElementInArray={handleRemoveBlackList}
                handleAddMoreElementInArray={handleAddMoreBlackList}
                disable={(): boolean => {
                    return _.last(botDetector.blacklist)?.length === 0;
                }}
                disableRemove={(index: number): boolean => {
                    return botDetector.blacklist[index]?.length === 0 || botDetector.blacklist.length <= 1;
                }}
                viewAddMoreButton={true}
            />
        );
    };

    const renderPattern = (): JSX.Element => {
        return (
            <TextInputArray
                inputType="text"
                changeType={changeTypeBotDetectorPatterns}
                arr={botDetector.patterns}
                label={'Pattern'}
                name="bot-detector-pattern"
                placeholder="MyAndroidClient/1.0"
                handleChangeArrayState={handleChangeBotDetector}
                handleRemoveElementInArray={handleRemovePattern}
                handleAddMoreElementInArray={handleAddMorePattern}
                disable={(): boolean => {
                    return _.last(botDetector.patterns)?.length === 0;
                }}
                disableRemove={(index: number): boolean => {
                    return botDetector.patterns[index]?.length === 0 || botDetector.patterns.length <= 1;
                }}
                viewAddMoreButton={true}
            />
        );
    };

    const renderCacheSize = (): JSX.Element => {
        return (
            <TextField
                value={botDetector.cacheSize}
                fullWidth
                type="number"
                id="bot-detector-cache-size"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeBotDetector(event, changeTypeBotDetectorCacheSize, 0)
                }
                placeholder="Cache Size"
                label="Cache Size"
            />
        );
    };

    const renderInputs = (): JSX.Element => {
        if (botDetector.enable) {
            return (
                <CardContent>
                    <Grid container spacing={2}>
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
                            {renderWhiteList()}
                            <p>
                                An array with <strong>EXACT MATCHES </strong>of trusted user agents that can connect.
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
                            {renderBlackList()}
                            <p>
                                An array of <strong>EXACT MATCHES </strong> of undesired bots, to reject immediately.
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
                            {renderPattern()}
                            <p>
                                An array with all the regular expressions that define bots. Matching bots are rejected.
                            </p>
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            style={{
                                marginTop: '20px',
                            }}
                        >
                            {renderCacheSize()}
                            <p>
                                Number of user agents cached to speed up repetitive bot detection. Use <code>0</code>
                                for no cache.
                            </p>
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
                                            checked={botDetector?.enable}
                                            name="service-config-enable-https"
                                            onChange={(event) =>
                                                handleChangeBotDetector(event, changeTypeBotDetectorEnable, 0)
                                            }
                                        />
                                    }
                                    label="Bot Detector"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </CardContent>
                {renderInputs()}
            </Card>
        </div>
    );
};
