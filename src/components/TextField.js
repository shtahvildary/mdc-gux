import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});



class TextFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id: '',
      type: '',
      label:'',
      autoComplete: '',
      multiline: 'Controlled',
      value: '',
      defaultValue: '',
      InputLabelProps: '',
      helperText: '',
      //
      inputValue: '',

    }
  }
  componentWillMount() {
    this.setState({ name: this.props.name })
    this.setState({ id: this.props.id })
    this.setState({ type: this.props.type })
    this.setState({ label: this.props.label })
    this.setState({ autoComplete: this.props.autoComplete })
    this.setState({ value: this.props.value })
    this.setState({ defaultValue: this.props.defaultValue })
    this.setState({ type: this.props.type })
    this.setState({ InputLabelProps: this.props.InputLabelProps })
    this.setState({ helperText: this.props.helperText })
    // this.setState({})
  }

  // this.setState(
  //   // name,id,type,autoComplete, value, defaultValue,type,InputLabelProps,helperText={this.props} )
  //     }
  handleChange = name => event => {
      var json={}
      json[this.props.id]=event.target.value
      this.props.change(json)
  };

  render() {
    const { classes } = this.props;

    return (
      <TextField
        id={this.state.id}
        label={this.state.label}
        className={classes.textField}
        value={this.state.value}
        onChange={this.handleChange()}
        margin="normal"
        defaultValue={this.state.defaultValue}
        type={this.state.type}
        InputLabelProps={this.state.InputLabelProps}
        helperText={this.state.helperText}

      />

      // InputProps={{
      //   readOnly: true,
      // shrink: true,
      // }}
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
