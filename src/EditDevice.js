import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MyButton from "./components/Button";
import axios from "axios";
import TextField from "./components/TextField";
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";
import Menu from "./components/Menu";

class EditDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      ip: "",
      description: "",
      model: "",
      code:"",
      department:"",
      specialProperties:[],
      spTbx:[],
      open: true
    };
  }
  tbxReadValue(input) {
    this.setState(input);
  }
  tbxSpReadValue(input){
    var specialProperties=this.state.specialProperties;
    console.log("input: ",input)

    var ind=specialProperties.findIndex(i=>i.name===Object.keys(input)[0])
    var key=Object.keys(input)[0];
    if(ind===-1)specialProperties.push({name:key,value:input[key]});
    else specialProperties[ind]={name:key,value:input[key]};
    this.setState({specialProperties},()=>{

    })
  }
  setId(selectedId){this.setState(selectedId, () => {})}
  setDeviceType(selectedId) {
    console.log(selectedId)
    this.setState(selectedId, () => {
      var index=this.state.deviceTypes.findIndex(i=>i._id===selectedId.deviceType)
      var spTbx=[]
      var sp=this.state.deviceTypes[index].specialProperties
      if(sp)

    //   <TextField
    //   id="ip"
    //   label="IP"
    //   change={this.tbxReadValue.bind(this)}
    //   defaultValue={this.state.ip}
    // />
      sp.map(i=>{
        console.log("i: ",i)
      spTbx.push(
        <TextField id={i.en} label={i.fa} 
        change={this.tbxSpReadValue.bind(this)} 
        />
      )})
      this.setState({spTbx},()=>{
        this.fillComponent(this.props)
      })
    })
  }
  saveBtnClick(event) {
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
      .then(function(response) {
        if (response.status === 200) {
          console.log("update device is OK :D");
          alert("ذخیره سازی با موفقیت انجام شد.");         
        } else {
          console.log("some error ocurred", response.status);
        }
      }).then(this.closeModal())      
      .catch(function(error) {
        console.log(error);
      });
     
  }
  else {
    alert("تمامی فیلدهای ستاره دار را پر کنید.");

    // alert("Input field value is missing");
  }
}
closeModal() { this.props.close(true) }

  callApi = async payload => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/devices/update",
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  callApiMenus = async model => {
    var response = await axios({
      method: "post",
      url: global.serverAddress + "/" + model + "/all/names",
      headers: { "x-access-token": localStorage.getItem("token") }
    });
    // const body = await response.json();
    if (response.status !== 200) throw Error(response.message);

    return response;
  };
 

  fillComponent(input) {
    console.log(input);
    this.setState({ open: input.open });

    var { _id, name, ip, model, deviceType, description, code,specialProperties,department } = input.device;
    console.log("_id: ", _id);

    this.setState(
      { _id, name, ip, model, deviceType, description, code,specialProperties,department },
      () => {
        var localComponent = [];
        localComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                id="name"
                label="نام"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.name}
              />
              <br />
              <TextField
                id="ip"
                label="IP"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.ip}
              />
              <br />
              <TextField
                id="description"
                label="توضیحات"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.description}
              />
              <br />
              <Menu id="deviceType" name="نوع" items={this.state.deviceTypes} selectedId={this.setDeviceType.bind(this)}
                defaultValue={this.state.deviceType}
                />
          {this.state.spTbx}
             
          <br /><TextField id="model" label="مدل" change={this.tbxReadValue.bind(this)} />
          <br /><TextField id="code" label="شماره اموال" change={this.tbxReadValue.bind(this)} />
         <div id="specialProperties"></div>
          <br />
          <Menu id="department" name="واحد" items={this.state.departments} selectedId={this.setId.bind(this)} />
          <br/>
              <MyButton label="ذخیره" click={this.saveBtnClick.bind(this)} />
            </div>
          </MuiThemeProvider>
        );
        this.setState({ localComponent: localComponent }, () => {});
      }
    );
  }
  componentWillMount() {
    console.log("hiiii")
    var deviceTypes,departments;
   
    var open = this.props.open;
    var input = this.props;
    this.setState(
      {
        open,
        input
      },
      () => {
        console.log(this.props);
        this.callApiMenus('devicetypes').then(res=>{
          deviceTypes=res.data.deviceTypes
        this.callApiMenus("departments").then(res => {
          departments = res.data.departments;
          this.setState({ deviceTypes,departments }, () => {
            console.log(this.props);

            this.fillComponent(this.props);
          });
        
        });
      }
    );
  })
  }
  componentWillReceiveProps(newProps) {
    this.fillComponent(newProps);
  }
  tbxReadValue(input) {
    this.setState(input);
  }
  editModal(event) {
    var open = !this.state.open;
    this.setState({ open }, () => {});
  }
  render() {
    return (
      <Paper>
        <div>
          <Modal
            title="ویرایش سخت افزار"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.editModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}

export default EditDevice;
