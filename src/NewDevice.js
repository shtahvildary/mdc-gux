import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import Card from './components/Card'
import Menu from './components/Menu'


import { withStyles } from '@material-ui/core/styles';

class NewDevice extends Component {
  constructor(props) {

    super(props);
    const { classes } = this.props;
    this.state = {
      
      name:"",
      ip:"",
      description:"",
      deviceType:"",
      model:"", 
      vlan:"",
    
      location:"",
      managementUrl:"",
     
      //wifi:
      password:"",
      channel:"",

      //todo: add pc config
      
    }
    
  }
  tbxReadValue(input) {
    this.setState(input);
    console.log(input)
  }
  setId(selectedId) {
    this.setState(selectedId, () => {
      console.log(selectedId)
    })
  }
  saveBtnClick(event) {
    console.log("state: ",this.state)
    //To be done:check for empty values before hitting submit
    if ( this.state.name.length > 0 && this.state.deviceType.length > 0&& this.state.location.length>0&&this.state.vlan.length>0) {
      var payload = {

        "name": this.state.name,
        "ip": this.state.ip,
        "description": this.state.description,
        "deviceType": this.state.deviceType,
        "model": this.state.model,
        "vlan": this.state.vlan,
        "location": this.state.location,
        "managementUrl": this.state.managementUrl,
       
        //wifi:
        "password": this.state.password,
        "channel": this.state.channel,
  
        //todo: add pc config
      }
      this.callApi(payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            console.log("add new device is OK :D");
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
    const response = await axios({ method: 'post', url: global.serverAddress + '/devices/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  callApiMenus = async (model) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/all/names', headers: { "x-access-token": localStorage.getItem('token') } });
    // const body = await response.json();
    if (response.status !== 200) throw Error(response.message);

    return response;
  };
  componentWillMount(){
    var vlans,deviceTypes,locations;
    this.callApiMenus('vlans').then(res=>{
      vlans=res.data.vlans
      console.log("dsgsdgsgsdf")
      this.callApiMenus('devicetypes').then(res=>{
        deviceTypes=res.data.deviceTypes
        this.callApiMenus('locations').then(res=>{
          console.log("locations: ",res.data.locations)
          locations=res.data.locations
        this.setState({vlans,deviceTypes,locations},()=>{
          var localComponent = []
    localComponent.push(
      <MuiThemeProvider>
        <div>
          {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
          {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
          <TextField id="name" label="نام" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="ip" label="ip" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />
          <br />
          <Menu id="deviceType" name="نوع" items={this.state.deviceTypes} selectedId={this.setId.bind(this)} />
          
          <br /><TextField id="model" label="مدل" change={this.tbxReadValue.bind(this)} />
          <br /><Menu id="vlanId" name="شبکه مجازی" items={this.state.vlans} selectedId={this.setId.bind(this)}/>
          <br />
          <Menu id="location" name="مکان" items={this.state.locations} selectedId={this.setId.bind(this)} />
          <br /><TextField id="managementUrl" label="آدرس url" change={this.tbxReadValue.bind(this)} />

          {/* wifi: */}
          <br /><TextField id="password" type="password" label="کلمه عبور" change={this.tbxReadValue.bind(this)} />
          <br /><TextField id="channel" label="کانال" change={this.tbxReadValue.bind(this)} />
          <br />
          <Button label="ذخیره"  click={this.saveBtnClick.bind(this)} />
        </div>
      </MuiThemeProvider>
    )
    this.setState({ localComponent: localComponent },()=>{

      console.log("local component: ",this.state.localComponent)
    })
    
        })
      })
      })
    })
    .catch(err=>console.log(err));
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="new device" />
        </MuiThemeProvider>
        <Card pageName="افزودن سخت افزار جدید" content={this.state.localComponent}/>
      </div>
    )
  }
}
export default NewDevice


