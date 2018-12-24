import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import Card from './components/Card'

class NewDeviceType extends Component {
  constructor(props) {

    super(props);
    // const { classes } = this.props;
    this.state = {
      name:'',
      description: '',
      spTbxCount:0, 
      specialProperties:[] ,
      tmpSPEn:[],
      tmpSPFa:[],
      // tmpSP:[],
    }
  }
    fillComponent(){
      var {spTbxCount}=this.state;
      console.log(spTbxCount)
      var spTbx=[];
      for(var i=0;i<spTbxCount;i++)
      spTbx.push(<div>
                      <TextField id={"en"+i} label="please enter in english..." change={this.tbxReadSPEn.bind(this)} />
                      {/* <TextField id={"en"+i} label="please enter in english..." change={this.tbxReadSPValue.bind(this)} /> */}
                      
                      <TextField id={"fa"+i} label="لطفا نام مورد نظر را به زبان فارسی بنویسید..." change={this.tbxReadSPFa.bind(this)} />
                      {/* <TextField id={"fa"+i} label="لطفا نام مورد نظر را به زبان فارسی بنویسید..." change={this.tbxReadSPValue.bind(this)} /> */}
                      <br/>
                    </div>
      )
      var localComponent = []
      localComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField id="name" label="نام" change={this.tbxReadValue.bind(this)} />
            <br />
            <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} />
            <br />
            {spTbx}
            <Button label="افزودن ویژگی" click={this.addTbxSP.bind(this,spTbxCount)} />
            <br/>
            <Button label="ذخیره"  click={this.saveBtnClick.bind(this)} />
          </div>
        </MuiThemeProvider>
      )
      this.setState({localComponent})
    }
    componentWillMount(){
      this.fillComponent()
    }

    addTbxSP(spTbxCount,event){
      console.log(spTbxCount)
      spTbxCount++
      this.setState({spTbxCount},()=>{
        this.fillComponent()
      })
    }
    tbxReadSPEn(input){
      console.log(input)
      var {specialProperties,tmpSPEn}=this.state;
      var ind=tmpSPEn.findIndex(i=>i.name===Object.keys(input)[0])
      console.log("tmpSPEn: ",tmpSPEn)

      var key=Object.keys(input)[0];
      if(ind===-1){
        tmpSPEn.push({name:key,value:input[key]});
    }
      else {
        tmpSPEn[ind]={name:key,value:input[key]};
        if(specialProperties[ind]) specialProperties[ind].en=input[key]
        else specialProperties.push({en:input[key]})
  }
      console.log("specialProperties: ",specialProperties)
      console.log("tmpSPEn: ",tmpSPEn)
      this.setState({specialProperties},()=>{})
    }

    tbxReadSPFa(input){
      console.log(input)
      var {specialProperties,tmpSPFa}=this.state;
      var ind=tmpSPFa.findIndex(i=>i.name===Object.keys(input)[0])
      console.log("tmpSP: ",tmpSPFa)

      var key=Object.keys(input)[0];
      if(ind===-1){
        tmpSPFa.push({name:key,value:input[key]});
    }
      else {
        tmpSPFa[ind]={name:key,value:input[key]};
        if(specialProperties[ind]) specialProperties[ind].fa=input[key]
        else specialProperties.push({fa:input[key]})
  }
      console.log("specialProperties: ",specialProperties)
      console.log("tmpSPFa: ",tmpSPFa)
      this.setState({specialProperties},()=>{})
    }

  //   tbxReadSPValue(input){
  //     console.log(input)
  //     var {specialProperties,tmpSP}=this.state;
  //     var ind=tmpSP.findIndex(i=>i.name===Object.keys(input)[0])
  //     console.log("tmpSP: ",tmpSP)

  //     var key=Object.keys(input)[0];
  //     if(ind===-1){
  //       var json={}
  //       json[key]=input[key]
  //       console.log(json)
  //       specialProperties.push(json);
  //       tmpSP.push({name:key,value:input[key]});
  //   }
  //     else {
  //       tmpSP[ind]={name:key,value:input[key]};
  //       specialProperties[key]=input[key]
  // }
  //     console.log("specialProperties: ",specialProperties)
  //     console.log("tmpSP: ",tmpSP)
  //     this.setState({specialProperties},()=>{})
  //   }
  tbxReadValue(input) {
    this.setState(input);
  }
  
  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    if ( this.state.name.length > 0 ) {
      var payload = {

        "name": this.state.name,
        "description": this.state.description,
        "specialProperties":this.state.specialProperties
      }

      this.callApi(payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("add new location is OK :D");
            alert("ذخیره سازی با موفقیت انجام شد.");
            window.location.reload()
            
          }
          else {
            alert("خطایی رخ داده. لطفا دوباره امتحان کنید.");
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
    const response = await axios({ method: 'post', url: global.serverAddress + '/devicetypes/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  render() {
    return [
      
        <MuiThemeProvider >
          <AppBar  title="new device type" />
        </MuiThemeProvider>,
        <Card  pageName="افزودن نوع جدید" content={this.state.localComponent}/>,
      
    ]
  }
}
export default NewDeviceType


