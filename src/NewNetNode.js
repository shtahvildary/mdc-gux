import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import './index.css';

// import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



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
        this.state={
            floatingLabelText:'',
            cableNumber:'',
            switchName:'',
            switchPort:'',
            vlanName:'',
            type:'',
            location:'',
        }
        var localComponent = []
        localComponent.push(
            <MuiThemeProvider>
                <div>
                {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
                {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
                شماره patch panel<TextField id="patchPanelNumber" floatingLabelText="شماره patch panel" />
                    <br/>
                    شماره کابل:<TextField id="cableNumber" floatingLabelText="شماره کابل" />
                    <br/>
                    سوییچ: <TextField id="switchName" floatingLabelText="سوییچ" />
                    <br/>
                    شماره پورت سوییچ:<TextField id="switchPort" floatingLabelText="شماره پورت سوییچ" />
                    <br/>
                    شبکه مجازی: <TextField id="vlanName" floatingLabelText="شبکه مجازی" />
                    <br/>
                    نوع: <TextField id="type" floatingLabelText="نوع" />
                    <br/>
                    مکان: <TextField id="location" floatingLabelText="مکان" />
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
      handleClick(event){
    var self = this;
   
    //To be done:check for empty values before hitting submit
    if(this.state.floatingLabelText.length>0 && this.state.cableNumber.length>0 && this.state.switchName.length>0 && this.state.switchPort.length>0&& this.state.vlanName.length>0&& this.state.type.length>0&& this.state.location.length>0){
      var payload={
      "fName": this.state.floatingLabelText,
      "lName":this.state.cableNumber,
      "username":this.state.switchName,
      "password":this.state.vlanName,
      "password":this.state.type,
      "password":this.state.location,
      // "role":role
      }
      axios.post(global.serverAddress+'/netnodes/new', payload)
     .then(function (response) {
       console.log(response);
       if(response.status === 200){
         console.log("add new netNode is OK :D");
        //  var loginscreen=[];
        //  loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} />);
        //  var loginmessage = "Not Registered yet.Go to registration";
        //  self.props.parentContext.setState({loginscreen:loginscreen,
        //  loginmessage:loginmessage,
        //  buttonLabel:"ثبت نام",
        //  isLogin:true
        //   });
       }
       else{
         console.log("some error ocurred",response.status);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }
      }

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
export default withStyles(styles)(NewNetNode)
// export default NewNetNode


