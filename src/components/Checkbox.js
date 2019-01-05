import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    constructor(props){
        super(props);
        this.state = {
          checkedB: true,  
          items:[],
        };
    }

  componentWillMount(){
if(!this.props.items)return
var items=[];
this.props.items.map((i,index)=>{
    items.push(<FormControlLabel  control={
        <Checkbox
          checked={this.props.checked}
          onChange={this.handleChange(i.code)}
          value={i.code}
          color="primary"
        />
      }
      label={i.description}/>)
})
this.setState({items});

  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
      
        {this.state.items}
        {/* <FormControlLabel disabled control={<Checkbox value="checkedD" />} label="Disabled" /> */}

      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
