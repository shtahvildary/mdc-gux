import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import Button from "./components/Button";
import axios from "axios";
import Menu from "./components/Menu";
import TextField from "./components/TextField";
import Card from "./components/Card"
class NewSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ip: "",
      description: "",
      model: "",
      diagramUrl: "",
      location: "",
      code:"",
    };  
  }
  tbxReadValue(input) {
    this.setState(input);
  }
  
  fillComponent(){

    var localComponent = [];
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField
          required
            id="name"
            label="نام سوییچ"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <TextField
            id="ip"
            label="IP سوییچ"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <TextField
          required
            id="model"
            label="مدل سوییچ"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <TextField
                id="code"
                label="شماره اموال"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.code}
              />
              <br />
          <TextField
            id="diagramUrl"
            label="نمودار PRTG"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <Menu
            id="location"
            name="مکان"
            items={this.state.locations}
            selectedId={this.setId.bind(this,"locations")}
          />
          {this.state.locationInfo?(
                 <p> {this.state.locationInfo.name} واقع در ساختمان {this.state.locationInfo.building}، اتاق {this.state.locationInfo.room}</p>
                ):("")}
          {/* <TextField id="location" label="مکان" change={this.tbxReadValue.bind(this)}/> */}
          <br />
          <TextField
            id="description"
            label="توضیحات"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <Button label="ذخیره" click={this.saveBtnClick.bind(this)} />
        </div>
      </MuiThemeProvider>
    );
    this.setState ( {localComponent: localComponent},()=>{});
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
    if (
      this.state.name.length > 0 &&
      this.state.model.length > 0 
    ) {
      var payload = {
        name: this.state.name,
        ip: this.state.ip,
        description: this.state.description,
        model: this.state.model,
        code:this.state.code,
        diagramUrl: this.state.diagramUrl,
        location: this.state.location
      };
     

      this.callApi(payload)
        .then(function(response) {
          if (response.status === 200) {
            console.log("add new switch is OK :D");
            alert("ذخیره سازی با موفقیت انجام شد.");
            window.location.reload()

          } else {
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert("تمامی فیلدهای ستاره دار را پر کنید.");
    }
  }
  callApi = async payload => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/switches/new",
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
  callApiSelect = async (model,payload) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/select/one', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  componentWillMount() {
    var locations;
    this.callApiMenus("locations").then(res => {
      locations = res.data.locations;
      this.setState({locations}, () => {
        this.fillComponent()
      });
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="salam" />
        </MuiThemeProvider>
        <Card pageName="افزودن سوییچ جدید" content={this.state.localComponent}/>
      </div>
    );
  }
}
export default NewSwitch;
