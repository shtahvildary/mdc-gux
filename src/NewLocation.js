import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import Button from "./components/Button";
import axios from "axios";
import TextField from "./components/TextField";
import "./index.css";
import Card from "./components/Card"
// import Radiogroup from "./components/Radiogroup";
import Menu from "./components/Menu";

class NewLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      building:"",
    };
    var localComponent = [];
    var fHfItems=[{_id:0,name:"طبقه"},{_id:1,name:"نیم طبقه"}]

    localComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField
            id="name"
            label="نام"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <TextField
            id="building"
            label="ساختمان"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <Menu id="fHf" name="طبقه/نیم طبقه" items={fHfItems} selectedId={this.setId.bind(this)} />
          <TextField
            id="level"
            label="شماره طبقه یا نیم طبقه"
            change={this.tbxReadValue.bind(this)}
          />
          <br/>
          <TextField
            id="room"
            label="اتاق"
            change={this.tbxReadValue.bind(this)}
          />
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
    this.state = {
      localComponent: localComponent
    };
  }
  setId(selectedId) {
    this.setState(selectedId, () => {
    })
  }

  tbxReadValue(input) {
    this.setState(input);
  }
  saveBtnClick(event) {
    if ( this.state.building.length > 0) {
      var payload = {
        name: this.state.name,
        description: this.state.description,
        building:this.state.building,
        fHf:this.state.fHf,
        level:this.state.level,
        room:this.state.room,        
      };
     

      this.callApi(payload)
        .then(function(response) {
          console.log("response: ", response);
          if (response.status === 200) {
            console.log("add new location is OK :D");
            alert("ذخیره سازی با موفقیت انجام شد.");
            window.location.reload()

          } else {
            alert("خطایی رخ داده. لطفا دوباره امتحان کنید.");
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function(error) {
          console.log("error: ", error);
        });
    } else {
      alert("تمامی فیلدهای ستاره دار را پر کنید.");
      // alert("Input field value is missing");
    }
  }
  callApi = async payload => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/locations/new",
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="salam" />
        </MuiThemeProvider>
        <Card pageName="افزودن مکان جدید" content={this.state.localComponent}/>
      </div>
    );
  }
}
export default NewLocation;
