import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./App.css"
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";

class ViewVlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
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
  fillComponent(input) {
    var localComponent = [];
    console.log("vlan: ", input);
    this.setState({ open: input.open })
    
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <p>نام:  </p>
          <p>شماره {input.vlan.number} </p>
          <p>آی پی {input.vlan.ip}</p>
          <p>اولین آی پی {input.vlan.firstIp}</p>
          <p>آخرین آی پی {input.vlan.lastIp}</p>
          <p>subnet mask {input.vlan.subnetMask}</p>
          <p>توضیحات: {input.vlan.description} </p>
        </div>
      </MuiThemeProvider>
    );
    this.setState({ localComponent: localComponent }, () => { });

  }
  componentWillReceiveProps(newProps) {
    this.fillComponent(newProps)
  }
  viewModal(event) {
    var open = !this.state.open;
    this.setState({ open }, () => {
    });
  }
  render() {
    return (
      <Paper >
        <div>
          <Modal title="مشخصات VLAN"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.viewModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}
export default ViewVlan;
