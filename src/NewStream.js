import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import Card from './components/Card'

class NewStream extends Component {
  constructor(props) {

    super(props);
    this.state = {
      name:"",
      address:"",  
    }
    
  }
  tbxReadValue(input) {
    this.setState(input);
  }
 
  

  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    if ( this.state.name.length > 0 ) {
      var payload = {

        "name": this.state.name,
        "address": this.state.address,
      }
      this.callApi(payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("add new stream is OK :D");
          }
          else {
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("تمامی فیلدهای ستاره دار را پر کنید.");

      // alert("Input field value is missing");
    }
  }
  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/streams/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  
  setLocalComponent(){
    var localComponent = []
    localComponent.push(
      <MuiThemeProvider>

          <TextField id="nameFa" label="نام فارسی" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="nameEn" label="نام انگلیسی" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="address" label="آدرس" change={this.tbxReadValue.bind(this)} />
          
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