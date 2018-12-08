import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import Card from './components/Card'
import Menu from './components/Menu'

class NewDevice extends Component {
  constructor(props) {

    super(props);
    this.state = {
      name:"",
      ip:"",
      description:"",
      deviceType:"",
      model:"", 
      code:"",
      department:"",
      specialProperties:[],
      spTbx:[],
    }
    
  }
  tbxReadValue(input) {
    this.setState(input);
  }
  tbxSpReadValue(input){
    var specialProperties=this.state.specialProperties;
    var ind=specialProperties.findIndex(i=>i.name===Object.keys(input)[0])
    var key=Object.keys(input)[0];
    if(ind===-1)specialProperties.push({name:key,value:input[key]});
    else specialProperties[ind]={name:key,value:input[key]};
    this.setState({specialProperties},()=>{

    })
  }
  setId(selectedId){
    this.setState(selectedId, () => {})

  }
  setDeviceType(selectedId) {
    console.log(selectedId)
    this.setState(selectedId, () => {
      var index=this.state.deviceTypes.findIndex(i=>i._id===selectedId.deviceType)
      var spTbx=[]
      var sp=this.state.deviceTypes[index].specialProperties
      if(sp)
      sp.map(i=>{
      spTbx.push(
        <TextField id={i.en} label={i.fa} 
        change={this.tbxSpReadValue.bind(this)} 
        />
      )})
      this.setState({spTbx},()=>{
        this.setLocalComponent()
      })
    })
  }
  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    if ( this.state.name.length > 0 && this.state.deviceType.length > 0&& this.state.department.length>0) {
      var payload = {

        "name": this.state.name,
        "ip": this.state.ip,
        "description": this.state.description,
        "deviceType": this.state.deviceType,
        "model": this.state.model,
        "code": this.state.code,
        "department": this.state.department,
        "specialProperties":this.state.specialProperties,
      }
      this.callApi(payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("add new device is OK :D");
            alert("ذخیره سازی با موفقیت انجام شد.");
            window.location.reload()
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
      alert("تمامی فیلدهای ستاره دار را پر کنید.");

      // alert("Input field value is missing");
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
  setLocalComponent(){
    var localComponent = []
    localComponent.push(
      <MuiThemeProvider>

          <TextField id="name" label="نام" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="ip" label="ip" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />
          <br />
          <Menu id="deviceType" name="نوع" items={this.state.deviceTypes} selectedId={this.setDeviceType.bind(this)} />
          {this.state.spTbx}
          
          <br /><TextField id="model" label="مدل" change={this.tbxReadValue.bind(this)} />
          <br /><TextField id="code" label="شماره اموال" change={this.tbxReadValue.bind(this)} />
         <div id="specialProperties"></div>
          <br />
          <Menu id="department" name="واحد" items={this.state.departments} selectedId={this.setId.bind(this)} />
          <br/>
          
          <br />
          <Button label="ذخیره"  click={this.saveBtnClick.bind(this)} />
      </MuiThemeProvider>
    )
    this.setState({ localComponent: localComponent },()=>{
    })
    
  }
  componentWillMount(){
    var deviceTypes,departments;
    
      this.callApiMenus('devicetypes').then(res=>{
        deviceTypes=res.data.deviceTypes

        this.callApiMenus('departments').then(res=>{
          departments=res.data.departments
        this.setState({deviceTypes,departments},()=>{
          this.setLocalComponent()    
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