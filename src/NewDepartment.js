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
    }

  }
  tbxReadValue(input) {
    this.setState(input);
  }
  fillComponent(){
    var localComponent = []
console.log("hiiii")
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <br />
          <TextField id="name" label="نام" change={this.tbxReadValue.bind(this)} />
          <br />
          {/* Phones and locations should be  array */}
          <Menu id="locations" name="مکان" items={this.state.locations} selectedId={this.setId.bind(this,"locations")}
          />
          {this.state.locationInfo?(
                 <p> {this.state.locationInfo.name} واقع در ساختمان {this.state.locationInfo.building}، اتاق {this.state.locationInfo.room}</p>
                ):("")}
          {/* <TextField id="location" label="مکان" change={this.tbxReadValue.bind(this)}/> */}
          <br />
          <TextField id="phones" label="phones" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />
          <br />
          <Button label="ذخیره" click={this.saveBtnClick.bind(this)} />
        </div>
      </MuiThemeProvider>
    )
    this.setState  ({localComponent})
  }
  setId(model,selectedId) {
    this.setState(selectedId, () => {
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


