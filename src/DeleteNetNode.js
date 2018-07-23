import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import MyButton from './components/Button';
import axios from 'axios';
import MyTextField from './components/TextField';
import Menu from './components/Menu'
import Card from './components/Card'
import './index.css';
import Modal from './components/Modal'

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

class EditNetNode extends Component {
  constructor(props) {

    super(props);
    // const { classes } = this.props;
    this.state = {

      _id:'',
      cableNumber: '',
      switchId: '',
      switchPort: '',
      vlanId: '',
      // type: '',
      location: '',

      //for use in menu:
      vlans: [],
      switches: [],
      locations: [],
      // deviceTypes:[],
      devices:[],

      editModalOpen:true,
    }
  }
  setId(selectedId) {
    this.setState(selectedId, () => {
    })
  }
  saveBtnClick(event) {
    // var self = this;
    //To be done:check for empty values before hitting submit
    console.log("netNode: ",this.state)
    // if (
    //   this.state.netNode.patchPanelPort.length > 0 &&
    //   this.state.netNode.cableNumber.length > 0 &&
    //   this.state.netNode.switchId.length > 0 &&
    //   this.state.netNode.switchPort.length > 0 &&
    //   this.state.netNode.vlanId.length > 0 &&
    //   this.state.netNode.device.length > 0 &&
    //   this.state.netNode.location.length > 0 ){
      var payload = {
        "_id":this.state._id,
        
      }
      this.callApi(payload)
     
        .then(function (response) {
          if (response.status === 200) {
            console.log("delete netNode is OK :D");
           
          }
          else {
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/netNodes/update', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
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
    console.log(this.props)
    var vlans, switches,devices, locations;
    var { _id,patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location,deviceId,locationId,vlanId} = this.props.netNode


    this.callApiMenus('vlans')
      .then(res => {
        vlans = res.data.vlans
        this.callApiMenus('switches').then(res => {
          switches = res.data.switches
          this.callApiMenus('devices').then(res => {
            devices = res.data.devices
          this.callApiMenus('locations').then(res => {
            locations = res.data.locations
            this.setState({ vlans, switches,devices, locations,_id,patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location,deviceId,locationId ,vlanId}, () => {

              var localComponent = []
             
              // this.setState({_id,patchPanelPort,cableNumber,switchName,switchPort,vlan,device,description,location,switchId,vlanId,deviceId,locationId},()=>{console.log("netNode: ",this.state)})
              // console.log(_id,patchPanelPort,cableNumber,switchName,switchPort,vlan,device,description,location,switchId,vlanId,deviceId,locationId)
              // console.log("vlanId: ",vlanId)
              console.log("netNode: ",this.state)
             
              localComponent.push(
                
                <MuiThemeProvider>
                  <div>
                    {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
                    {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
                    <MyTextField id="patchPanelNumber" label="شماره patch panel" change={this.tbxReadValue.bind(this)} defaultValue={this.state.patchPanelPort} />
                    <br />
                    <MyTextField id="cableNumber" label="شماره کابل" change={this.tbxReadValue.bind(this)} defaultValue={this.state.cableNumber} />
                    <br />
                    <Menu id="vlanId" name="شبکه مجازی" items={this.state.vlans} selectedId={this.setId.bind(this)} defaultValue={this.state.vlanId}/>

                    <br />
                     <Menu id="switchId" name="سوییچ" items={this.state.switches} selectedId={this.setId.bind(this)} defaultValue={this.state.switchId} />
                    <br />
                    <MyTextField id="switchPort" label="شماره پورت سوییچ" change={this.tbxReadValue.bind(this)} defaultValue={this.state.switchPort} />
                    <br />
                     {/* <Menu id="type" name="نوع" items={this.state.deviceTypes} selectedId={this.setId.bind(this)} /> */}
                     <Menu id="device" name="وسیله" items={this.state.devices} selectedId={this.setId.bind(this)} defaultValue={this.state.deviceId} />
                    {/* نوع: <Menu id="type" floatingLabelText="نوع" onChange={this.handleChange('type')} /> */}
                    <br />
                   <Menu id="location" name="مکان" items={this.state.locations} selectedId={this.setId.bind(this)} defaultValue={this.state.locationId} />
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
editModal(event){
  // var editModalOpen=false
  var editModalOpen=!this.state.editModalOpen
  // return modalOpen
  this.setState({editModalOpen},()=>{console.log("editModalOpen: ",this.state.editModalOpen)})   
}
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="info sima" />
        </MuiThemeProvider>

        <Modal open={this.state.editModalOpen} components={this.state.localComponent} close={this.editModal.bind(this)}/>
       
      </div>
    )
  }
}

export default EditNetNode


