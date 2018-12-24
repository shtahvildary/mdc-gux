import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MyButton from './components/Button';
import axios from 'axios';
import MyTextField from './components/TextField';
import Menu from './components/Menu'
import './index.css';
import Modal from './components/Modal'
import Paper from '@material-ui/core/Paper'



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

      open:true,
    }
  }
  setId(selectedId) {
    this.setState(selectedId, () => {
      console.log("state: ",this.state)
    })
  }
  saveBtnClick(event) {
      var payload = {
        "_id":this.state._id,
        "patchPanelPort": this.state.patchPanelPort,
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
      console.log("payload: ",payload)
      this.callApi(payload)
     
        .then(function (response) {
          if (response.status === 200) {
            console.log("update netNode is OK :D");
          alert("ذخیره سازی با موفقیت انجام شد.");
          }
          else {
            console.log("some error ocurred", response.status);
          }
        }).then(this.closeModal())   
        .catch(function (error) {
          console.log(error);
        });
    }
    closeModal() { this.props.close(true) }  
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
  fillComponent(input){
    this.setState({ open: input.open })

    var vlans, switches,devices, locations;
    var { _id,patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location,deviceId,locationId,vlanId} = input.netNode;


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
              localComponent.push(
                
                <MuiThemeProvider>
                  <div>
                    <MyTextField id="patchPanelNumber" label="شماره patch panel" change={this.tbxReadValue.bind(this)} defaultValue={this.state.patchPanelPort} />
                    <br />
                    <MyTextField id="cableNumber" label="شماره کابل" change={this.tbxReadValue.bind(this)} defaultValue={this.state.cableNumber} />
                    <br />
                    <Menu id="vlanId" name="VLAN" items={this.state.vlans} selectedId={this.setId.bind(this)} defaultValue={this.state.vlanId}/>

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
                    <MyTextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} defaultValue={this.state.description} />
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
  componentWillMount() {
    var open = this.props.open
    this.setState(
      {
        open,
      },
      () => {
        this.fillComponent(this.props)
      }
    );
   

    
  }
  componentWillReceiveProps(newProps){
    this.fillComponent(newProps)

  }
tbxReadValue(input){this.setState(input) }
editModal(event){
  
    var open = !this.state.open;
    this.setState({ open }, () => {
    });
   
}
  render() {
    return (
      <Paper>
      <div>
        <Modal title="ویرایش نود" open={this.state.open} components={this.state.localComponent} close={this.editModal.bind(this)}/>
      </div>
      </Paper>
    )
  }
}

export default EditNetNode


