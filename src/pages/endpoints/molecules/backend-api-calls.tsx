import { Checkbox, FormControlLabel, FormGroup, Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/hooks';
import { modifyEndpoint } from '../../../store/reducers/endpoints/reducer';
import { deepClone } from '../../../util';
import { changeTypeJWTSigningDisableJWKSecurity } from '../constants';
interface IBackendAPICallsProps {
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
    headingDiv: {
        ...theme.typography.button,
        fontSize: '20px',
        alignItems: 'flex-start',
    },
}));

export const BackendAPICalls: React.FunctionComponent<IBackendAPICallsProps> = ({ endpointIndex }): JSX.Element => {
    const endpointInfo = useAppSelector((state) => state.endpoints[endpointIndex]);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChangeEndpointEnableSeqProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
        let changedEndpoint = deepClone(endpointInfo);
        changedEndpoint.enableSequentialProxy = event.target.checked;
        dispatch(modifyEndpoint({ index: endpointIndex, endpoint: changedEndpoint }));
    };
    return (
        <Grid item className={classes.gridItem}>
            <div className={classes.headingDiv}>{'Backend API calls (where the data comes from)'}</div>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={endpointInfo.enableSequentialProxy}
                            name="endpoint-enable-seq-proxy"
                            onChange={handleChangeEndpointEnableSeqProxy}
                        />
                    }
                    label="Enable sequential proxy"
                />
            </FormGroup>
            <p>
                When the sequential proxy is enabled a backend call can use data from a previous call. The data from
                previous calls is available in a variable like <code>{'{resp0_XXXX}'}</code> where
                <code>0</code>
                is the index of the backend and <code>XXXX</code> the attribute. E.g:
                <code>{'{resp1_hotel_id}'}</code>
                takes the field <code>hotel_id</code> from the second backend call (index starts at 0). Inject this
                variable in the desired backend endpoint.
            </p>
        </Grid>
    );
};
