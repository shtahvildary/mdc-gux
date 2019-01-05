import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MyButton from "./components/Button";
import axios from "axios";
import TextField from "./components/TextField";
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";
import Menu from "./components/Menu";

class EditSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      ip: "",
      description: "",
      model: "",
      diagramUrl: "",
      location: null,

      open: true
    };
  }
  setId(model, selectedId) {
    console.log("model: ",model)
    console.log("selectedId: ",selectedId)
    this.setState(selectedId, () => {
      var _id = selectedId[Object.keys(selectedId)[0]];
      var payload = { _id };
      this.callApiSelect(model, payload).then(res =>
        this.setState(res.data, () => {
    console.log("res.data: ",res.data)

          this.fillComponent(this.state.input);
        })
      );
    });
  }
  saveBtnClick(event) {
    console.log("this.state.location: ",this.state.location)
    var location=null
    if (this.state.locationInfo) location=this.state.locationInfo._id
    var payload = {
      _id: this.state._id,
      name: this.state.name,
      ip: this.state.ip,
      model: this.state.model,
      diagramUrl: this.state.diagramUrl,
      location: location,
      description: this.state.description
    };
    this.callApi(payload)
      .then(function(response) {
        if (response.status === 200) {
          console.log("update switch is OK :D");
          alert("ذخیره سازی با موفقیت انجام شد.");
        } else {
          console.log("some error ocurred", response.status);
        }
      }).then(this.closeModal())      
      .catch(function(error) {
        console.log(error);
      });
  }
  closeModal() { this.props.close(true) }
  callApi = async payload => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/switches/update",
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
  callApiSelect = async (model, payload) => {
    var response = await axios({
      method: "post",
      url: global.serverAddress + "/" + model + "/select/one",
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  fillComponent(input) {
    console.log(input);
    this.setState({ open: input.open });
    var { _id, name, ip, model, diagramUrl, description, location,code } = input.sw;

    this.setState(
      { _id, name, ip, model, diagramUrl, description, location,code },
      () => {
        var localComponent = [];
        console.log("locationName: ",this.state.input.sw.locationId)
        localComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
              required
                id="name"
                label="نام سوییچ"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.name}
              />
              <br />
              <TextField
                id="ip"
                label="IP سوییچ"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.ip}
              />
              <br />
              <TextField
              required
                id="model"
                label="مدل سوییچ"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.model}
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
                defaultValue={this.state.diagramUrl}
              />
              <br />
              <Menu
                id="location"
                name="مکان"
                items={this.state.locations}
                selectedId={this.setId.bind(this, "locations")}
                defaultValue={this.state.input.sw.locationId}
              />
              {this.state.locationInfo ? (
                <p>
                  {" "}
                  {this.state.locationInfo.name} واقع در ساختمان{" "}
                  {this.state.locationInfo.building}، اتاق{" "}
                  {this.state.locationInfo.room}
                </p>
              ) : (
                ""
              )}
              <br />
              <TextField
                id="description"
                label="توضیحات"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.description}
              />
              <br />
              <MyButton label="ذخیره" click={this.saveBtnClick.bind(this)} />
            </div>
          </MuiThemeProvider>
        );
        this.setState({ localComponent: localComponent }, () => {});
      }
    );
  }
  componentWillMount() {
    var locations;
    var open = this.props.open;
    var input = this.props;
    this.setState(
      {
        open,
        input
      },
      () => {
        
        this.callApiMenus("locations").then(res => {
          locations = res.data.locations;
          this.setState({ locations }, () => {
            console.log(this.props);

            this.fillComponent(this.props);
          });
        });
      }
    );
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
            title="ویرایش سوییچ"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.editModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}

export default EditSwitch;
