import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


  const styles = theme => ({
    margin: 15,


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
  
  
    
  
class NewNetNode extends Component {
    constructor(props) {
        
        super(props);
        const { classes } = this.props;
        var localComponent = []
        localComponent.push(
            <MuiThemeProvider>
                <div>
                <TextField
          id="search"
          label="Search field"
          type="search"
        //   className={classes.textField}
          margin="normal"
        />
                <TextField
          id="name"
          label="Name"
        //   className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
                    <TextField floatingLabelText="شماره patch panel" />
                    <TextField floatingLabelText="شماره کابل" />
                    <br/>
                    <TextField floatingLabelText="سوییچ" />
                    <TextField floatingLabelText="شماره پورت سوییچ" />
                    <br/>
                    <TextField floatingLabelText="شبکه مجازی" />
                    <TextField floatingLabelText="نوع" />
                    <TextField floatingLabelText="مکان" />
                    <br/>
                    <Button label="ذخیره" primary={true} style={styles} onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
        )
        this.state={
            localComponent:localComponent,
        }
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render(){
        return(
            <div>
            <MuiThemeProvider>
                <AppBar title="salam"/>
            </MuiThemeProvider>
            {this.state.localComponent}
    </div>
        )
    }
}
export default NewNetNode


