import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    card: {
        // minHeight: '200px',
        marginTop: theme.spacing(5),
    },
}));

const ServiceCard = () => {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography variant="h6" color="textSecondary">
                        Service 1
                    </Typography>
                    <Divider />
                    <Typography variant="body1" component="p">
                        Service Description here
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Download
                    </Button>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default ServiceCard;
