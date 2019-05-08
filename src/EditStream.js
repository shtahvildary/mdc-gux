import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import MyButton from "./components/Button";
import axios from "axios";
import TextField from "./components/TextField";
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";
import ReactSelect from "./components/ReactSelect"

class EditStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      nameEn: "",
      nameFa: "",
      address: "",
      streamServer: "",
      open: true
    };
  }
  // tbxReadValue(input) {
  //   this.setState(input);
  // }


  saveBtnClick(event) {
    if (this.state.nameEn.length && this.state.address.length && this.state.streamServer.length > 0) {
      var name = {}
      name.en = this.state.nameEn;
      name.fa = this.state.nameFa;
      var payload = {
        "_id": this.state._id,
        "name": name,
        "address": this.state.address,
        "streamServer": this.state.streamServer,
      }
      this.callApi(payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("update stream is OK :D");
            alert("ذخیره سازی با موفقیت انجام شد.");
          } else {
            console.log("some error ocurred", response.status);
          }
        }).then(this.closeModal())

        .catch(function (error) {
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

    var { _id, nameEn, nameFa, address, streamServer } = input.stream;
    console.log("_id: ", _id);

    this.setState(
      { _id, nameEn, nameFa, address, streamServer },
      () => {
        var localComponent = [];
        if(input.stream.isMosaic===1){
          var mosaicInputs=[];
          input.stream.mosaicInputs.map(i=>{
          mosaicInputs.push(i.name.fa)
          })
        }
        console.log("mosaicInputs: ",mosaicInputs)
        localComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField id="nameFa" label="نام فارسی" change={this.tbxReadValue.bind(this)} defaultValue={this.state.nameFa} />
              <br />
              <TextField id="nameEn" label="نام انگلیسی" change={this.tbxReadValue.bind(this)} defaultValue={this.state.nameEn} />
              <br />
              <br />
              {input.stream.isMosaic ? (
                <ReactSelect id="mosaicInputs" name="ورودی های موزاییک" items={this.state.streamsList} selectedId={this.setMosaicInputs.bind(this)} defaultValues={mosaicInputs} isMulti={true} isClearable={true} />
              ) : (
              <TextField id="address" label="آدرس" change={this.tbxReadValue.bind(this)} defaultValue={this.state.address} />
              )}
              <TextField id="streamServer" label="IP سرور استریم" change={this.tbxReadValue.bind(this)} defaultValue={this.state.streamServer} />
              <br />
              <MyButton label="ذخیره" click={this.saveBtnClick.bind(this)} />
            </div>
          </MuiThemeProvider>
        );
        this.setState({ localComponent: localComponent }, () => { });
      }
    );
  }

  componentWillMount() {
    console.log("hiiii")

    var open = this.props.open;
    var input = this.props;
    var streamsList;
    this.callApiMenu('streams')
      .then(res => {
        streamsList = res.data.streams
        this.setState(
          {
            open,
            input, streamsList
          },
          () => {
            console.log(this.props);
            this.setLocalComponent(this.props);
          })
      })

  }
  callApiMenu = async (model) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/all/names', headers: { "x-access-token": localStorage.getItem('token') } });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  setMosaicInputs(selectedId) {
    this.setState(selectedId, () => { })
  }
  componentWillReceiveProps(newProps) {
    this.setLocalComponent(newProps);
  }
  tbxReadValue(input) {
    this.setState(input);
  }
  editModal(event) {
    var open = !this.state.open;
    this.setState({ open }, () => { });
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
