import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';


import { withStyles } from '@material-ui/core/styles';

class NewVlan extends Component {
  constructor(props) {

    super(props);
    const { classes } = this.props;
    this.state = {
      type:'',
      description: '',
      
    }
    var localComponent = []
    localComponent.push(
      <MuiThemeProvider>
        <div>
          {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
          {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
          <TextField id="type" label="نام" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />
          <br />
          <Button label="ذخیره"  click={this.saveBtnClick.bind(this)} />
        </div>
      </MuiThemeProvider>
    )
    this.state = {
      localComponent: localComponent,

    }
  }
  tbxReadValue(input) {
    this.setState(input);
  }
  
  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    if ( this.state.type.length > 0 && this.state.description.length > 0) {
      var payload = {

        "type": this.state.type,
        "description": this.state.description,
      }

      this.callApi(payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            console.log("add new location is OK :D");
          }
          else {
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("Input field value is missing");
    }
  }
  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/devicetypes/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="new vlan" />
        </MuiThemeProvider>
        {this.state.localComponent}
      </div>
    )
  }
}
export default NewVlan


