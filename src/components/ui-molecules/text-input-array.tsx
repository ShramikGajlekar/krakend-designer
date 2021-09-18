import { Grid, FormGroup, FormControlLabel, Button, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import { Checkbox, TextField } from '@material-ui/core';
import * as React from 'react';

interface ITextInputArrayProps {
    inputType: string;
    changeType: string;
    arr: string[] | number[];
    name: string;
    placeholder: string;
    label: string;
    // eslint-disable-next-line
    handleChangeArrayState: any;
    // eslint-disable-next-line
    handleRemoveElementInArray: any;
    // eslint-disable-next-line
    handleAddMoreElementInArray: any;
    // eslint-disable-next-line
    disable: any;
    // eslint-disable-next-line
    disableRemove: any;
    viewAddMoreButton?: true | false;
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
        color: 'white',
    },
    removeButton: {
        marginTop: '25%',
    },
}));

const TextInputArray: React.FunctionComponent<ITextInputArrayProps> = ({
    inputType,
    changeType,
    arr,
    name,
    placeholder,
    label,
    handleChangeArrayState,
    handleRemoveElementInArray,
    handleAddMoreElementInArray,
    disable,
    disableRemove,
    viewAddMoreButton,
}) => {
    const classes = useStyles();
    return (
        <>
            {arr.map((elem, index) => {
                return (
                    <>
                        <Grid container spacing={1} direction="row" alignItems="flex-start">
                            <Grid item sm={10}>
                                <TextField
                                    type={inputType}
                                    fullWidth
                                    key={name + '-' + index.toString()}
                                    value={elem}
                                    id={name + '-input-change-' + index.toString()}
                                    variant="outlined"
                                    placeholder={placeholder}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        handleChangeArrayState(event, changeType, index)
                                    }
                                    label={label}
                                />
                            </Grid>
                            <Grid item sm={1}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    id={name + '-remove-' + index.toString()}
                                    disabled={disableRemove(index) || arr.length <= 1}
                                    className={classes.removeButton}
                                    onClick={() => handleRemoveElementInArray(index)}
                                >
                                    X
                                </Button>
                            </Grid>
                        </Grid>
                        <br></br>
                    </>
                );
            })}
            {viewAddMoreButton ? (
                <>
                    <Grid container spacing={4} direction="row" alignItems="flex-start">
                        <Grid item sm={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                disabled={disable()}
                                onClick={handleAddMoreElementInArray}
                            >
                                +
                            </Button>
                        </Grid>
                    </Grid>
                    <br></br>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default TextInputArray;
