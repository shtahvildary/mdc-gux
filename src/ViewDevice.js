import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./App.css"
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";

class ViewSwitch extends Component {
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
    console.log("sw: ", input);
    this.setState({ open: input.open })

    localComponent.push(
      <MuiThemeProvider>
        <div>
          <p>نام سوییچ: {input.sw.name} </p>
          <p>آی پی: {input.sw.ip} </p>
          <p>مدل : {input.sw.model} </p>
          <p>آدرس url: {input.sw.managementUrl} </p>
          <p>مکان: {input.sw.locationName} </p>
          <p>توضیحات: {input.sw.description} </p>
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
          <Modal title="مشخصات سوییچ"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.viewModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}
export default ViewSwitch;
