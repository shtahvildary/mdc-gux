import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import AppBar from '@material-ui/core/AppBar';
// import MyButton from './components/Button';
// import axios from 'axios';
// import MyTextField from './components/TextField';
// import Menu from './components/Menu'
// import Card from './components/Card'
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

class ViewNetNode extends Component {
  constructor(props) {
    super(props);
    // const { classes } = this.props;
    this.state = {
      _id: "",
      cableNumber: "",
      switchId: "",
      switchPort: "",
      vlanId: "",
      // type: '',
      location: "",

      //for use in menu:
      vlans: [],
      switches: [],
      locations: [],
      // deviceTypes:[],
      devices: [],

      viewModalOpen: true
    };
  }

  componentWillMount() {
    console.log(this.props);
    var vlans, switches, devices, locations;
    var {
      _id,
      patchPanelPort,
      cableNumber,
      switchId,
      switchPort,
      vlan,
      device,
      description,
      location,
      deviceId,
      locationId,
      vlanId
    } = this.props.netNode;

    this.setState(
      {
        _id,
        patchPanelPort,
        cableNumber,
        switchId,
        switchPort,
        vlan,
        device,
        description,
        location,
        deviceId,
        locationId,
        vlanId
      },
      () => {
        var localComponent = [];
        console.log("netNode: ", this.state);

        localComponent.push(
          <MuiThemeProvider>
            <div>
              {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
              {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
              <p>شماره patch panel: {this.state.patchPanelPort} </p>
              <p>شماره کابل: {this.state.cableNumber} </p>
              <p>شبکه مجازی: {this.state.vlanId} </p>
              <p>سوییچ: {this.state.switchId} </p>
              <p>شماره پورت سوییچ: {this.state.switchPort} </p>
              <p>وسیله: {this.state.deviceId} </p>
              <p>مکان: {this.state.locationId} </p>
            </div>
          </MuiThemeProvider>
        );
        this.setState({ localComponent: localComponent }, () => {});
      }
    );
  }
  viewModal(event) {
    // var viewModalOpen=false
    var viewModalOpen = !this.state.viewModalOpen;
    // return modalOpen
    this.setState({ viewModalOpen }, () => {
      console.log("viewModalOpen: ", this.state.viewModalOpen);
    });
  }
  render() {
    return (
      <Paper>
        <div>
          <Modal
            open={this.state.viewModalOpen}
            components={this.state.localComponent}
            close={this.viewModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}

export default ViewNetNode;
