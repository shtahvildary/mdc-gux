import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import MyButton from './components/Button';
import axios from 'axios';
import MyTextField from './components/TextField';
import Menu from './components/Menu'
import Card from './components/Card'
import './index.css';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

class NewNetNode extends Component {
  constructor(props) {

    super(props);
    // const { classes } = this.props;
    this.state = {

      cableNumber: '',
      switchId: '',
      switchPort: '',
      vlanId: '',
      type: '',
      location: '',

      //for use in menu:
      vlans: [],
      switches: [],
      locations: [],
      deviceTypes:[],
      devices:[],
    }

  }
  setId(selectedId) {
    this.setState(selectedId, () => {
    })
  }
  saveBtnClick(event) {
    // var self = this;
    //To be done:check for empty values before hitting submit
    console.log(this.state)
    if (this.state.patchPanelNumber.length > 0 &&
      this.state.switchId.length > 0 &&
      this.state.switchPort.length > 0 &&
      this.state.vlanId.length > 0 &&
      this.state.device.length > 0 &&
      this.state.location.length > 0 ){
      var payload = {
        "patchPanelPort": this.state.patchPanelNumber,
        "cableNumber": this.state.cableNumber,
        "switchId": this.state.switchId,
        "switchPort": this.state.switchPort,
        "vlan": this.state.vlanId,
        "device": this.state.device,
        "description": this.state.description,
        "location": this.state.location,
        //
        // "type": this.state.type,
      }
      this.callApi(payload)
        // axios.post(global.serverAddress+'/switches/new', payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("add new netNode is OK :D");
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
    const response = await axios({ method: 'post', url: global.serverAddress + '/netNodes/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  callApiMenus = async (model) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/all/names', headers: { "x-access-token": localStorage.getItem('token') } });
    // const body = await response.json();
    if (response.status !== 200) throw Error(response.message);

    return response;
  };
  componentWillMount() {
    var vlans, switches, devices,locations;
    this.callApiMenus('vlans')
      .then(res => {
        vlans = res.data.vlans
        this.callApiMenus('switches').then(res => {
          switches = res.data.switches
          this.callApiMenus('devices').then(res=>{
            console.log("devices: ",res)
            devices=res.data.devices
          this.callApiMenus('locations').then(res => {
            locations = res.data.locations
            this.setState({ vlans, switches,devices, locations }, () => {
              console.log(this.state.devices)

              var localComponent = []
              localComponent.push(
                
                <MuiThemeProvider>
                  <div>
                    {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
                    {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
                    <MyTextField id="patchPanelNumber" label="شماره patch panel" change={this.tbxReadValue.bind(this)} />
                    <br />
                    <MyTextField id="cableNumber" label="شماره کابل" change={this.tbxReadValue.bind(this)} />
                    <br />
                    <Menu id="vlanId" name="شبکه مجازی" items={this.state.vlans} selectedId={this.setId.bind(this)}/>

                    <br />
                     <Menu id="switchId" name="سوییچ" items={this.state.switches} selectedId={this.setId.bind(this)} />
                    <br />
                    <MyTextField id="switchPort" label="شماره پورت سوییچ" change={this.tbxReadValue.bind(this)} />
                    <br />
                     {/* <Menu id="type" name="نوع" items={this.state.deviceTypes} selectedId={this.setId.bind(this)} /> */}
                     <Menu id="device" name="وسیله" items={this.state.devices} selectedId={this.setId.bind(this)} />
                    {/* نوع: <Menu id="type" floatingLabelText="نوع" onChange={this.handleChange('type')} /> */}
                    <br />
                   <Menu id="location" name="مکان" items={this.state.locations} selectedId={this.setId.bind(this)} />
                    <br />
                    <MyButton label="ذخیره"  click={this.saveBtnClick.bind(this)} />
                  </div>
                </MuiThemeProvider >
                
              )
             this.setState({ localComponent: localComponent },()=>{})
            });
          })
        })
        })

      })
      .catch(err => console.log(err));
  }
tbxReadValue(input){this.setState(input) }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="info sima" />
        </MuiThemeProvider>
        <Card pageName="افزودن نود جدید" content={this.state.localComponent}/>
      </div>
    )
  }
}

export default NewNetNode


