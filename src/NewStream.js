import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import Radiogroup from "./components/Radiogroup";
import ReactSelect from "./components/ReactSelect";

// import AlertDialog from "./components/AlertDialog";
import Card from './components/Card'
// import { Modal } from "@material-ui/core";

class NewStream extends Component {
  constructor(props) {

    super(props);
    this.state = {
      nameEn: "",
      nameFa: "",
      address: "",
      streamServer: "",
      mosaicInputs: [],
    }

  }
  tbxReadValue(input) {
    this.setState(input);
  }



  saveBtnClick(event) {
    var isMosaic;
    if (this.state.mosaicInputs.length > 0) isMosaic = 1;
    else isMosaic = 0
    //To be done:check for empty values before hitting submit
    if (this.state.nameEn.length && this.state.streamServer.length && (this.state.address.length > 0 || isMosaic)) {
      var name = {}
      name.en = this.state.nameEn;
      name.fa = this.state.nameFa;
      var payload = {
        "name": name,
        "streamServer": this.state.streamServer
      }
      if (isMosaic) {
        if (this.state.mosaicInputs.length != this.state.xMosaic * this.state.yMosaic) {
          alert("تعداد استریم های انتخاب شده برابر با ابعاد موزاییک نیست");
        }

        else {
          payload.isMosaic = 1;
          payload.mosaicInputs = this.state.mosaicInputs
          payload.mosaicDimensions={"x":this.state.xMosaic,"y":this.state.yMosaic}
        }
      }
      else //=> it's not mosaic
       { 
        payload.isMosaic = 0;
         payload.address = this.state.address
       }
      this.callApi(payload)
        .then(function (response) {
          if (response.status === 200) {
            alert("ذخیره سازی با موفقیت انجام شد.");
            // <AlertDialog title="save" open={true} contentText="استریم جدید با موفقیت اضافه شد." btnLbl="ok"/>
            window.location.reload()
          }
          else {
            console.log("some error ocurred", response.status);
            // <AlertDialog title="error" open={true} contentText="خطایی رخ داده، لطفا دوباره اقدام کنید.." btnLbl="ok"/>
          }
        })
        .catch(function (error) {
          console.log(error);
          // <AlertDialog title="error" open={true} contentText="خطایی رخ داده، لطفا دوباره اقدام کنید.." btnLbl="ok"/>
        });
    }
    else {
      alert("تمامی فیلدهای ستاره دار را پر کنید.");
    }
  }
  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/streams/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  componentWillMount() {
    var streamsList;
    this.callApiMenu('streams')
      .then(res => {
        streamsList = res.data.streams
        this.setState({ streamsList }, () => {
          this.setLocalComponent()
        })
      })

  }

  setLocalComponent() {
    var localComponent = []
    var isMosaicRG = [{ label: "بله", value: 1 }, { label: "خیر", value: 0 }]
    localComponent.push(
      <MuiThemeProvider>
        <TextField id="nameFa" label="نام فارسی" change={this.tbxReadValue.bind(this)} />
        <br />
        * <TextField id="nameEn" label="نام انگلیسی" change={this.tbxReadValue.bind(this)} />
        <br />
        * <TextField id="streamServer" label="IP سرور استریم" change={this.tbxReadValue.bind(this)} />
        <br />
        آیا استریم جدید از نوع موزاییک است؟
          < Radiogroup items={isMosaicRG} selectedValue={this.streamType.bind(this)} />
        {this.state.addedComponents}
        <br />
        <Button label="ذخیره" click={this.saveBtnClick.bind(this)} />
      </MuiThemeProvider>
    )
    this.setState({ localComponent: localComponent }, () => {
      console.log("state: ", this.state)
    })
  }
  streamType(isMosaic) {
    var addedComponents = []
    if (isMosaic == 1) {
      addedComponents.push(
        <MuiThemeProvider>
          ابعاد موزاییک:
          <br/>
            <TextField id="xMosaic" label="افقی" change={this.tbxReadValue.bind(this)} />
          <TextField id="yMosaic" label="عمودی" change={this.tbxReadValue.bind(this)} />
          <ReactSelect id="mosaicInputs" name="ورودی های موزاییک" items={this.state.streamsList} selectedId={this.setMosaicInputs.bind(this)} isMulti={true} isClearable={true} />
        </MuiThemeProvider>
      )
    }
    else addedComponents.push(
      <MuiThemeProvider>
        * <TextField id="address" label="آدرس استریم" change={this.tbxReadValue.bind(this)} />
        <br />
      </MuiThemeProvider>
    )
    this.setState({ addedComponents }, () => {
      this.setLocalComponent()
    })
  }
  setMosaicInputs(selectedId) {
    this.setState(selectedId, () => {})
  }
  callApiMenu = async (model) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/all/names', headers: { "x-access-token": localStorage.getItem('token') } });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="new stream" />
        </MuiThemeProvider>
        <Card pageName="افزودن استریم جدید" content={this.state.localComponent} />
      </div>
    )
  }
}
export default NewStream