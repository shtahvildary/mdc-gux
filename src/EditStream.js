import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MyButton from "./components/Button";
import axios from "axios";
import TextField from "./components/TextField";
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";

class EditStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      nameEn: "",
      nameFa:"",
      address: "",
      streamServer:"",
      open: true
    };
  }
  tbxReadValue(input) {
    this.setState(input);
  }


  saveBtnClick(event) {
    if ( this.state.nameEn.length && this.state.address.length&&this.state.streamServer.length> 0 ) {
      var name={}
      name.en=this.state.nameEn;
      name.fa=this.state.nameFa;
      var payload = {
        "_id":this.state._id,
        "name": name,
        "address": this.state.address,
        "streamServer":this.state.streamServer,
      }
    this.callApi(payload)
      .then(function(response) {
        if (response.status === 200) {
          console.log("update stream is OK :D");
          // this.editModal
        } else {
          console.log("some error ocurred", response.status);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
     
  }
  else {
    alert("تمامی فیلدهای ستاره دار را پر کنید.");

    // alert("Input field value is missing");
  }
}


  callApi = async payload => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/streams/update",
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  
 

  setLocalComponent(input) {
    console.log(input);
    this.setState({ open: input.open });

    var { _id, nameEn,nameFa, address ,streamServer} = input.stream;
    console.log("_id: ", _id);

    this.setState(
      { _id, nameEn,nameFa, address,streamServer },
      () => {
        var localComponent = [];
        localComponent.push(
          <MuiThemeProvider>
            <div>
            <TextField id="nameFa" label="نام فارسی" change={this.tbxReadValue.bind(this)} defaultValue={this.state.nameFa} />
          <br />
          <TextField id="nameEn" label="نام انگلیسی" change={this.tbxReadValue.bind(this)} defaultValue={this.state.nameEn}/>
          <br />
          <TextField id="address" label="آدرس" change={this.tbxReadValue.bind(this)} defaultValue={this.state.address}/>
          <br/>
           <TextField id="streamServer" label="IP سرور استریم" change={this.tbxReadValue.bind(this)} defaultValue={this.state.streamServer}/>
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
   
    var open = this.props.open;
    var input = this.props;
    this.setState(
      {
        open,
        input
      },
      () => {
        console.log(this.props);
        this.setLocalComponent(this.props);
  })
  }
  componentWillReceiveProps(newProps) {
    this.setLocalComponent(newProps);
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
            title="ویرایش استریم"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.editModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}

export default EditStream;
