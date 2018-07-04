import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


  const styles = theme => ({
      button:{

          margin: 15,
      },


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
                {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
                {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
                    <TextField id="patchPanelNumber" floatingLabelText="شماره patch panel" />
                    <TextField id="cableNumber" floatingLabelText="شماره کابل" />
                    <br/>
                    <TextField id="switchName" floatingLabelText="سوییچ" />
                    <TextField id="switchPort" floatingLabelText="شماره پورت سوییچ" />
                    <br/>
                    <TextField id="vlanName" floatingLabelText="شبکه مجازی" />
                    <TextField id="type" floatingLabelText="نوع" />
                    <TextField id="location" floatingLabelText="مکان" />
                    <br/>
                    <Button label="ذخیره" primary={true} style={styles.button} onClick={(event) => this.handleClick(event)}/>
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


