import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./App.css"
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";

class ViewNetNode extends Component {
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
    console.log("netNode: ", input);
    this.setState({ open: input.open })

    localComponent.push(
      <MuiThemeProvider>
        <div>
          <p>شماره patch panel: {input.netNode.patchPanelPort} </p>
          <p>شماره کابل: {input.netNode.cableNumber} </p>
          <p>شبکه مجازی: {input.netNode.vlan} </p>
          <p>سوییچ: {input.netNode.switchName} </p>
          <p>شماره پورت سوییچ: {input.netNode.switchPort} </p>
          <p>وسیله: {input.netNode.device} </p>
          <p>مکان: {input.netNode.location} </p>
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
          <Modal title="مشخصات نود"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.viewModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}
export default ViewNetNode;
