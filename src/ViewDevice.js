import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./App.css"
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";
import axios from "axios";


class ViewDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }
  componentWillMount() {
    var open = this.props.open
    this.setState(
      {
        open,
      },
      () => {
        this.fillComponent(this.props.device._id,this.props.open)
        // this.fillComponent(this.props)
      }
    );
  }
  fillComponent(_id,open) {
    var localComponent = [];
    console.log("device: ", _id);
    this.callApi("select/one",{_id}).then(res=>{
      console.log(res)
    this.setState({ open: open })
var device=res.data.deviceInfo
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <p>نام: {device.name} </p>
          <p>آی پی: {device.ip} </p>
          <p>مدل : {device.model} </p>
          <p>نوع : {device.deviceTypeName} </p>
          <p>شماره اموال: {device.code} </p>
          {/* <p>سایر ویژگیها: {device.specialProperties} </p> */}
          <p>واحد: {device.departmentName} </p>
          <p>توضیحات: {device.description} </p>
        </div>
      </MuiThemeProvider>
    );
    this.setState({ localComponent: localComponent }, () => { });
    
  })
  }
  componentWillReceiveProps(newProps) {
    this.fillComponent(newProps)
  }

  callApi = async (path, payload) => {
    console.log(path,payload)
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/devices/" + path,
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);
    return response;
  };


  viewModal(event) {
    var open = !this.state.open;
    this.setState({ open }, () => {
    });
  }
  render() {
    return (
      <Paper >
        <div>
          <Modal title="مشخصات سوییچ"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.viewModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}
export default ViewDevice;
