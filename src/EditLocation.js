import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MyButton from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import Modal from './components/Modal'
import Paper from '@material-ui/core/Paper'
import Radiogroup from "./components/Radiogroup";




class EditLocation extends Component {
  constructor(props) {

    super(props);
    // const { classes } = this.props;
    this.state = {
      

      _id:'',
      building: '',
      floor: '',
      halfFloor: '',
      room: '',
      description: '',


      open:true,
    }
  }
  setId(selectedId) {
    this.setState(selectedId, () => {
    })
  }
  saveBtnClick(event) {
      var payload = {
        "_id":this.state._id,
        "building": this.state.building,
        "floor": this.state.floor,
        "halfFloor": this.state.halfFloor,
        "room": this.state.room,
        "description": this.state.description,
     
      }
      this.callApi(payload)
     
        .then(function (response) {
          if (response.status === 200) {
            console.log("update location is OK :D");
            this.editModal
          }
          else {
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/locations/update', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  fillComponent(input){
    this.setState({ open: input.open })
    var { _id,building, floor, halfFloor, room,  description} = input.location;
   
           
            this.setState({ building, floor, halfFloor, room,  description}, () => {

              var localComponent = []
              localComponent.push(
                
                <MuiThemeProvider>
                  <div>
                    <TextField id="building" label="ساختمان" change={this.tbxReadValue.bind(this)} defaultValue={this.state.patchPanelPort} />
                    <br />
          <Radiogroup items={[{label:"طبقه",value:0},{label:"نیم طبقه",value:1}]} selectedValue={this.setValue.bind(this)}/>
                   
                    <br />
                    <TextField
            id="fHf"
            label="شماره طبقه یا نیم طبقه"
            change={this.tbxReadValue.bind(this)}
          />
          <br/>
          <TextField
            id="room"
            label="اتاق"
            change={this.tbxReadValue.bind(this)}
          />
          <br />
          <TextField
            id="description"
            label="توضیحات"
            change={this.tbxReadValue.bind(this)}
          />
                    <br />
                    <MyButton label="ذخیره"  click={this.saveBtnClick.bind(this)} />
                  </div>
                </MuiThemeProvider >
                
              )
             this.setState({ localComponent: localComponent },()=>{})
            
          

      })
      .catch(err => console.log(err));
  }
  componentWillMount() {
    var open = this.props.open
    this.setState(
      {
        open,
      },
      () => {
        this.fillComponent(this.props)
      }
    );
   

    
  }
  componentWillReceiveProps(newProps){
    this.fillComponent(newProps)

  }
tbxReadValue(input){this.setState(input) }
editModal(event){
  
    var open = !this.state.open;
    this.setState({ open }, () => {
    });
   
}
  render() {
    return (
      <Paper>
      <div>
        <Modal title="ویرایش مکان" open={this.state.open} components={this.state.localComponent} close={this.editModal.bind(this)}/>
      </div>
      </Paper>
    )
  }
}

export default EditLocation


