import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import './index.css';
import Modal from './components/Modal'
import Paper from '@material-ui/core/Paper'




class EditVlan extends Component {
  constructor(props) {
    super(props);
    // const { classes } = this.props;
    this.state = {


      _id: '',
      name: '',
      number: '',
      ip: '',
      description: '',
      firstIp: '',
      lastIp: '',
      subnetMask: '',


      open: true,
    }
  }
  setId(selectedId) {
    this.setState(selectedId, () => {
    })
  }
  saveBtnClick(event) {
    var payload = {
      "_id": this.state._id,
      "number": this.state.number,
      "name": this.state.name,
      "ip": this.state.ip,
      "description": this.state.description,
      "firstIp": this.state.firstIp,
      "lastIp": this.state.lastIp,
      "subnetMask": this.state.subnetMask,

    }
    this.callApi(payload)
      .then(function (response) {
        if (response.status === 200) {
          console.log("update vlan is OK :D");
          alert("ذخیره سازی با موفقیت انجام شد.");
        }
        else {
          console.log("some error ocurred", response.status);
        }
      }).then(this.closeModal())
      .catch(function (error) {
        console.log(error);
      });
  }
  closeModal() { this.props.close(true) }

  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/vlans/update', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  fillComponent(input) {
    this.setState({ open: input.open })
    var { _id, number, name, ip, firstIp, lastIp, subnetMask, description } = input.vlan;

    this.setState({ _id, number, name, ip, firstIp, lastIp, subnetMask, description }, () => {

      var localComponent = []
      localComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField id="name" label="نام" change={this.tbxReadValue.bind(this)} defaultValue={this.state.name} />
            <br />
            <TextField id="number" label="شماره" change={this.tbxReadValue.bind(this)} defaultValue={this.state.number} />
            <br />
            <TextField id="ip" label="IP" change={this.tbxReadValue.bind(this)} defaultValue={this.state.ip} />
            <br />
            <TextField id="description" label="توضیحات" change={this.tbxReadValue.bind(this)} defaultValue={this.state.description} />
            <br /><TextField id="firstIp" label="اولین IP" change={this.tbxReadValue.bind(this)} defaultValue={this.state.firstIp} />
            <br /><TextField id="lastIp" label="آخرین IP" change={this.tbxReadValue.bind(this)} defaultValue={this.state.lastIp} />
            <br />
            <TextField id="subnetMask" label="subnetMask" change={this.tbxReadValue.bind(this)} defaultValue={this.state.subnetMask} />
            <br />
            <Button label="ذخیره" click={this.saveBtnClick.bind(this)} />
          </div>
        </MuiThemeProvider>

      )
      this.setState({ localComponent: localComponent }, () => { })
    })

  }
  setValue(value) {
    this.setState({ halfFloor: value }, () => { })

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
  componentWillReceiveProps(newProps) {
    this.fillComponent(newProps)

  }
  tbxReadValue(input) { this.setState(input) }
  editModal(event) {

    var open = !this.state.open;
    this.setState({ open }, () => {
    });

  }
  render() {
    return (
      <Paper>
        <div>
          <Modal title="ویرایش VLAN" open={this.state.open} components={this.state.localComponent} close={this.editModal.bind(this)} />
        </div>
      </Paper>
    )
  }
}

export default EditVlan


