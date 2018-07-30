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
      location: "",

      open: true
    };
  }
  setId(model, selectedId) {
    this.setState(selectedId, () => {
      var _id = selectedId[Object.keys(selectedId)[0]];
      var payload = { _id };
      this.callApiSelect(model, payload).then(res =>
        this.setState(res.data, () => {
          this.fillComponent(this.state.input);
        })
      );
    });
  }
  saveBtnClick(event) {
    var payload = {
      _id: this.state._id,
      name: this.state.name,
      ip: this.state.ip,
      model: this.state.model,
      diagramUrl: this.state.diagramUrl,
      location: this.state.location,
      description: this.state.description
    };
    this.callApi(payload)
      .then(function(response) {
        if (response.status === 200) {
          console.log("update location is OK :D");
          // this.editModal
        } else {
          console.log("some error ocurred", response.status);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

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
    var { _id, name, ip, model, diagramUrl, description, location } = input.sw;
    console.log("_id: ", _id);

    this.setState(
      { _id, name, ip, model, diagramUrl, description, location },
      () => {
        var localComponent = [];
        localComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
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
                id="description"
                label="توضیحات"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.description}
              />
              <br />
              <TextField
                id="model"
                label="مدل سوییچ"
                change={this.tbxReadValue.bind(this)}
                defaultValue={this.state.model}
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
                defaultValue={this.state.locationName}
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
              <MyButton label="ذخیره" click={this.saveBtnClick.bind(this)} />
            </div>
          </MuiThemeProvider>
        );
        this.setState({ localComponent: localComponent }, () => {});
      }
    );
  }
  setValue(value) {
    this.setState({ halfFloor: value }, () => {});
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
        console.log(this.props);
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
