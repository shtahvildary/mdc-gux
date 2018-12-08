import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import Card from './components/Card'
import Menu from './components/Menu'

class NewDepartment extends Component {
  constructor(props) {

    super(props);
    // const { classes } = this.props;
    this.state = {

      name: '',
      locations: [],
      phones: [],
      description: '',
      phoneTbxCount:1,
      locationMenuCount:1,
      locationMenus:[],
      selectedLocations:[],
    }

  }
  tbxReadValue(input) {
    this.setState(input);
  }
  addTbxPhone(phoneTbxCount,event){
    console.log(phoneTbxCount)
    phoneTbxCount++
    this.setState({phoneTbxCount})
    this.fillComponent()
  }
  tbxReadPhoneValue(input){
    var phones=this.state.phones;
    var ind=phones.findIndex(i=>i.name===Object.keys(input)[0])
    var key=Object.keys(input)[0];
    if(ind===-1)phones.push({name:key,value:input[key]});
    else phones[ind]={name:key,value:input[key]};
    this.setState({phones},()=>{})
  }
  addMenuLocation(event){
var {locationMenus,locations,selectedLocations,locationMenuCount}=this.state
if(selectedLocations.length>0){
  // locations=locations.map(l=>l._id)
selectedLocations.map(l=>{
  console.log(locations)
  // var index=locations.findIndex(l)
  var index=locations.indexOf(l)
  (index!=-1?(
    locations.splice(index,1)
  ):(""))
  console.log(locations)
})
}
locationMenuCount++
    console.log(locationMenus)
    locationMenus.push(
      <Menu id={"locations"+locationMenuCount} name="مکان" items={locations} selectedId={this.setId.bind(this,"locations")}/>
    )
   
    this.setState({locationMenus,locationMenuCount})
    this.fillComponent()
  }

  fillComponent(){
    var {phoneTbxCount,locationMenus}=this.state;
  var phoneTbx=[];
  for(var i=0;i<phoneTbxCount;i++)
  phoneTbx.push(<div>
                  <TextField id={"phone"+i} label="تلفن" change={this.tbxReadPhoneValue.bind(this)} />
                  <br/>
                </div>
  )

    var localComponent = []
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField id="name" label="نام" change={this.tbxReadValue.bind(this)}  defaultValue={this.state.name}/>
          <br/>
          {/*  locations should be  array */}
          {locationMenus}
          <Menu id="locations" name="مکان" items={this.state.locations} selectedId={this.setId.bind(this,"locations")}/>
          {this.state.locationInfo?(
                 <p> {this.state.locationInfo.name} واقع در ساختمان {this.state.locationInfo.building}، اتاق {this.state.locationInfo.room}</p>
                ):("")}
          <Button label="افزودن مکان" click={this.addMenuLocation.bind(this)} />

          {/* <TextField id="location" label="مکان" change={this.tbxReadValue.bind(this)}/> */}
          <br/>
          {phoneTbx}
          <Button label="افزودن تلفن" click={this.addTbxPhone.bind(this,phoneTbxCount)} />
          <br/>
          <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />

          <br/>
          <Button label="ذخیره" click={this.saveBtnClick.bind(this)} />
        </div>
      </MuiThemeProvider>
    )
    this.setState({localComponent})
  }
  setId(model,selectedId) {
    var selectedLocations=this.state.selectedLocations
    selectedLocations.push(selectedId)
    this.setState(selectedLocations, () => {
    var _id=selectedId[Object.keys(selectedId)[0]]
      var payload={_id}

      this.callApiSelect(model,payload).then(res=>
        this.setState(res.data,()=>{
          this.fillComponent()
        })
      )
    })
  }
  

 


  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    console.log(this.state.phones)
    if (this.state.name.length > 0) {
      var payload = {
        "name": this.state.name,
        "locations": this.state.locations,
        "phones": this.state.phones,
        "description": this.state.description,
      }

      this.callApi(payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            console.log("add new Department is OK :D");
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
    }
  } 
  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/Departments/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
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
  callApiSelect = async (model,payload) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/select/one', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  componentWillMount() {
    var locations;
    this.callApiMenus("locations").then(res => {
      console.log(res)
      locations = res.data.locations;
      this.setState({locations}, () => {
        this.fillComponent()
      });
    });
  }

  render() {
    console.log(this.state.localComponent)
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="new Department" />
        </MuiThemeProvider>
        <Card pageName="افزودن واحد" content={this.state.localComponent}/>
      </div>
    )
  }
}
export default NewDepartment;


