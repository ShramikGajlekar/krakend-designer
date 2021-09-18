import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const whiteCheckBoxStyles = () => ({
    root: {
        '&$checked': {
            color: '#ffffff',
        },
        color: '#ffffff',
    },
    checked: {},
});

const WhiteCheckbox = withStyles(whiteCheckBoxStyles)(Checkbox);

export { WhiteCheckbox };
