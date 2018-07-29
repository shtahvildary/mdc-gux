import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        // margin: theme.spacing.unit,
    margin: 15,
    },
    input: {
        display: 'none',
    },
});
class OutlinedButtons extends React.Component {
    constructor(props) {
        // const { classes } = props;
        super(props);
        this.state = {
            label: '',
            classes: props,
            clickevent: '',
        }

    }
    componentWillMount() {
        this.setState({ label: this.props.label })
    }
    
    handleClick(event) {
        this.props.click(event)
    }
    render() {
        return (
                <Button id={this.props.id} variant="outlined" color="primary" className={this.state.classes.button} onClick={(event) => this.handleClick(event)}>
                    {this.state.label}
                </Button>
        );
    }
}

OutlinedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);
