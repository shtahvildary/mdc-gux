import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import Card from './components/Card'

class NewVlan extends Component {
  constructor(props) {

    super(props);
    // const { classes } = this.props;
    this.state = {

      name: '',
      number: '',
      ip: '',
      description: '',
      firstIp: '',
      lastIp: '',
      subnetMask: '',
    }
    
  }

  fillComponent(){
    var localComponent = []
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField id="number" label="شماره" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="name" label="نام" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="ip" label="IP" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />
          <br /><TextField id="firstIp" label="اولین IP" change={this.tbxReadValue.bind(this)} />
          <br /><TextField id="lastIp" label="آخرین IP" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="subnetMask" label="subnetMask" change={this.tbxReadValue.bind(this)} />
          <br />
          <Button label="ذخیره" click={this.saveBtnClick.bind(this)} />
        </div>
      </MuiThemeProvider>
    )
    this.setState ({localComponent})
  }
  
  tbxReadValue(input) {
    this.setState(input);
  }
  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    if (this.state.number.length > 0 && this.state.name.length > 0 && this.state.ip.length > 0 && this.state.description.length > 0 && this.state.firstIp.length > 0 && this.state.lastIp.length > 0 && this.state.subnetMask.length > 0) {
      var payload = {
        "number": this.state.number,
        "name": this.state.name,
        "ip": this.state.ip,
        "description": this.state.description,
        "firstIp": this.state.firstIp,
        "lastIp": this.state.lastIp,
        "subnetMask": this.state.subnetMask,
      }

      this.callApi(payload)
        // axios.post(global.serverAddress+'/switches/new', payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            console.log("add new vlan is OK :D");
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
    const response = await axios({ method: 'post', url: global.serverAddress + '/vlans/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
 
componentWillMount(){
  this.fillComponent()
}
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="new vlan" />
        </MuiThemeProvider>
        <Card pageName="افزودن شبکه مجازی جدید" content={this.state.localComponent}/>
      </div>
    )
  }
}
export default NewVlan;


