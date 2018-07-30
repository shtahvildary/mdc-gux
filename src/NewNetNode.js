import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import MyButton from './components/Button';
import axios from 'axios';
import MyTextField from './components/TextField';
import Menu from './components/Menu'
import Card from './components/Card'
import './index.css';
import Grid from "@material-ui/core/Grid"
import AlertDialog from "./components/AlertDialog";
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
  setId(model,selectedId) {
    
    console.log(model)
    this.setState(selectedId, () => {
      console.log(selectedId)
    var _id=selectedId[Object.keys(selectedId)[0]]
      var payload={_id}

      this.callApiSelect(model,payload).then(res=>
        this.setState(res.data,()=>{
          this.setLocalComponent()
        })
         
      
      )
    })
  }
  saveBtnClick(event) {
    // var self = this;
    //To be done:check for empty values before hitting submit
    console.log(this.state)
    if (this.state.patchPanelPort.length > 0 &&
      this.state.switchId.length > 0 &&
      this.state.switchPort.length > 0 &&
      this.state.vlanId.length > 0 &&
      this.state.device.length > 0 &&
      this.state.location.length > 0 ){
      var payload = {
        "patchPanelPort": this.state.patchPanelPort,
        "cableNumber": this.state.cableNumber,
        "switchId": this.state.switchId,
        "switchPort": this.state.switchPort,
        "vlan": this.state.vlanId,
        "device": this.state.device,
        "description": this.state.description,
        "location": this.state.location,
      }
      this.callApi(payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("add new netNode is OK :D");
            <AlertDialog title="save" open={true} contentText="نود جدید با موفقیت اضافه شد." btnLbl="ok"/>
          }
          else {
            console.log("some error ocurred", response.status);
            <AlertDialog title="error" open={true} contentText="خطایی رخ داده، لطفا دوباره اقدام کنید.." btnLbl="ok"/>
          }
        })
        .catch(function (error) {
          console.log(error);
          <AlertDialog title="error" open={true} contentText="خطایی رخ داده، لطفا دوباره اقدام کنید.." btnLbl="ok"/>
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
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  callApiSelect = async (model,payload) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/select/one', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
setLocalComponent(){
  var localComponent = []
              localComponent.push(
                <MuiThemeProvider>
                  <div>
                    <MyTextField id="patchPanelPort" label="شماره patch panel" change={this.tbxReadValue.bind(this)} />
                    <MyTextField id="cableNumber" label="شماره کابل" change={this.tbxReadValue.bind(this)} />
                    <br />
                    <Menu id="vlanId" name="شبکه مجازی" items={this.state.vlans} selectedId={this.setId.bind(this,"vlans")}/>
                    {this.state.vlanInfo?(
                      <p> شبکه مجازی {this.state.vlanInfo.name} با شماره {this.state.vlanInfo.number} و آی پی {this.state.vlanInfo.ip}</p>
                      // <p>نام: {this.state.vlanInfo.name}</p>
                    ):("")}  
                    <br />
                     <Menu id="switchId" name="سوییچ" items={this.state.switches} selectedId={this.setId.bind(this,"switches")} />
                    {this.state.switchInfo?(
                     <p>سوییچ {this.state.switchInfo.name} با آی پی {this.state.switchInfo.ip} واقع در {this.state.switchInfo.location.name}</p>
                    ):("")}  
                    <br />                                        
                    <MyTextField id="switchPort" label="شماره پورت سوییچ" change={this.tbxReadValue.bind(this)} />
                    <br />                                   
                     <Menu id="device" name="وسیله" items={this.state.devices} selectedId={this.setId.bind(this,"devices")} />
                     {this.state.deviceInfo?(
                     <p> {this.state.deviceInfo.name} با آی پی {this.state.deviceInfo.ip} و شماره اموال {this.state.deviceInfo.code}</p>
                    ):("")}  
                    <br />      
                   <Menu id="location" name="مکان" items={this.state.locations} selectedId={this.setId.bind(this,"locations")} />
                   {this.state.locationInfo?(
                     <p> {this.state.locationInfo.name} واقع در ساختمان {this.state.locationInfo.building}، اتاق {this.state.locationInfo.room}</p>
                    ):("")}
                    <br />
                    <MyTextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />
                    <br/>
                    <MyButton label="ذخیره"  click={this.saveBtnClick.bind(this)} />
                  </div>
                </MuiThemeProvider >      
              )
             this.setState({ localComponent: localComponent },()=>{})
}
  componentWillMount() {
    var vlans, switches, devices,locations;
    this.callApiMenus('vlans')
      .then(res => {
        vlans = res.data.vlans
        this.callApiMenus('switches').then(res => {
          switches = res.data.switches
          this.callApiMenus('devices').then(res=>{
            devices=res.data.devices
          this.callApiMenus('locations').then(res => {
            locations = res.data.locations
            this.setState({ vlans, switches,devices, locations }, () => {
              this.setLocalComponent()
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


