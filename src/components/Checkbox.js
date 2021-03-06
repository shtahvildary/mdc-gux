import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class CheckboxLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedB: true,
      items: [],
      selectedItems:[],
    };
  }

  componentWillMount() {
    console.log("checkbox props: ", this.props)
    if (!this.props.items) return
    var items = [];
    this.props.items.map((i, index) => {
      items.push(<FormControlLabel control={
       

        <Checkbox
          checked={this.props.checked}
          onChange={this.handleChange(i.code)}
          value={i.code}
          color="primary"
        />
        
      }
        label={i.description} />)
    })
    this.setState({ items });
  }
  handleChange = name => event => {
    this.state.selectedItems.push(name)
    this.setState(({ [name]: event.target.checked} ,this.state.selectedItems),()=>{

      this.props.selectedItems(this.state.selectedItems)
    });
  };

  render() {
    // const { classes } = this.props;

    return (
      // <Grid container xs={6}   >
      <Grid item xs={6} >
      <FormGroup row >
        {this.state.items}
      </FormGroup>
      </Grid>
    );
  }
}
CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
