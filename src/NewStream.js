import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import AlertDialog from "./components/AlertDialog";
import Card from './components/Card'
import { Modal } from "@material-ui/core";

class NewStream extends Component {
  constructor(props) {

    super(props);
    this.state = {
      nameEn:"",
      nameFa:"",
      address:"", 
      streamServer:"" ,
      mosaicInputs:[],
    }
    
  }
  tbxReadValue(input) {
    this.setState(input);
  }
 
  

  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    if ( this.state.nameEn.length && this.state.address.length&&(this.state.streamServer.length> 0||this.state.mosaicInputs.length>0) ) {
      var name={}
      name.en=this.state.nameEn;
      name.fa=this.state.nameFa;
      var payload = {

        "name":name,
        "address": this.state.address,
        "streamServer":this.state.streamServer
      }
      this.callApi(payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("add new stream is OK :D");
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
    this.setLocalComponent()
  }
  
  setLocalComponent(){
    var localComponent = []
    localComponent.push(
      <MuiThemeProvider>

          <TextField id="nameFa" label="نام فارسی" change={this.tbxReadValue.bind(this)} />
          <br />
         * <TextField id="nameEn" label="نام انگلیسی" change={this.tbxReadValue.bind(this)} />
          <br />
         * <TextField id="address" label="آدرس" change={this.tbxReadValue.bind(this)} />
          <br />
          * <TextField id="streamServer" label="IP سرور استریم" change={this.tbxReadValue.bind(this)} />
          <br />
          <Button label="ذخیره"  click={this.saveBtnClick.bind(this)} />
      </MuiThemeProvider>
    )
    this.setState({ localComponent: localComponent },()=>{
    })
    
  }

  render() {
    return (
      <div>
        
        <MuiThemeProvider>
          <AppBar title="new stream" />
        </MuiThemeProvider>
        <Card pageName="افزودن استریم جدید" content={this.state.localComponent}/>
      </div>
    )
  }
}
export default NewStream