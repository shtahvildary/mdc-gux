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
      mosaicInputs: [],


      open: true
    };
  }

  componentWillMount() {

    var open = this.props.open;
    if (this.props.mosaicDimensions) {
      var xMosaic = this.props.stream.mosaicDimensions.x;
      var yMosaic = this.props.stream.mosaicDimensions.y;
    }
    var streamsList;
    this.callApiMenu('streams')
      .then(res => {
        streamsList = res.data.streams
        if (this.props.stream.isMosaic === 1) {
          var mosaicInputs = [];
          this.props.stream.mosaicInputs.map(i => {
            var index = streamsList.findIndex(svi => svi.name === i.name.fa)
            if (i != -1) mosaicInputs.push(streamsList[index])
          })
        }

        this.setState(
          {
            open,
            streamsList, mosaicInputs, xMosaic, yMosaic
          },
          () => {
            this.setLocalComponent(this.props)
          })
      })

  }
  saveBtnClick(event) {
    var isMosaic = this.state.isMosaic

    if (this.state.nameEn.length && this.state.streamServer.length && (this.state.address.length > 0 || isMosaic)) {

      var name = {}
      name.en = this.state.nameEn;
      name.fa = this.state.nameFa;
      var payload = {
        "_id": this.state._id,
        "name": name,
        "streamServer": this.state.streamServer,
        "isMosaic": isMosaic,
      }
      var completed = 0; //to show payload data is completed or not 
      if (isMosaic) {
        if (this.state.mosaicInputs.length != this.state.xMosaic * this.state.yMosaic) {
          alert("تعداد استریم های انتخاب شده برابر با ابعاد موزاییک نیست: ");
        }
        else {
          payload.mosaicInputs = this.state.mosaicInputs
          payload.mosaicDimensions = { "x": this.state.xMosaic, "y": this.state.yMosaic }
          completed = 1
        }
      }
      else //=> it's not mosaic
      {
        payload.address = this.state.address
        completed = 1
      }
      if (completed)
        this.callApi(payload)
          .then(function (response) {
            if (response.status === 200) {
              console.log("update stream is OK :D");
              alert("ذخیره سازی با موفقیت انجام شد.");
            } else {
              alert("خطایی رخ داده، لطفا دوباره امتحان کنید!");
              console.log("some error ocurred", response.status);
            }
          }).then(this.closeModal())

          .catch(function (error) {
            console.log(error);
          });

    }
    else {
      alert("تمامی فیلدهای ستاره دار را پر کنید.");
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
    this.setState({ open: input.open });

    var { _id, nameEn, nameFa, address, streamServer, isMosaic } = input.stream;
    if (!address) address = ""

    this.setState(
      { _id, nameEn, nameFa, address, streamServer, isMosaic },
      () => {
        var localComponent = [];
        var addedComponents = []
        if (input.stream.isMosaic == 1) {
          addedComponents.push(
            <MuiThemeProvider>
              ابعاد موزاییک:
          <br />
              <TextField id="xMosaic" label="افقی" change={this.tbxReadValue.bind(this)} defaultValue={input.stream.mosaicDimensions.x} />
              <TextField id="yMosaic" label="عمودی" change={this.tbxReadValue.bind(this)} defaultValue={input.stream.mosaicDimensions.y} />
              <ReactSelect id="mosaicInputs" name="ورودی های موزاییک" items={this.state.streamsList} selectedId={this.setMosaicInputs.bind(this)} defaultValues={this.state.mosaicInputs} isMulti={true} isClearable={true} />

            </MuiThemeProvider>
          )
        }
        else addedComponents.push(
          <MuiThemeProvider>
            * <TextField id="address" label="آدرس استریم" change={this.tbxReadValue.bind(this)} defaultValue={this.state.address} />
            <br />
          </MuiThemeProvider>
        )


        localComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField id="nameFa" label="نام فارسی" change={this.tbxReadValue.bind(this)} defaultValue={this.state.nameFa} />
              <br />
              <TextField id="nameEn" label="نام انگلیسی" change={this.tbxReadValue.bind(this)} defaultValue={this.state.nameEn} />
              <br />
              <br />
              {addedComponents}
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
