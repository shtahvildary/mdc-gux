import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./App.css"
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";

class ViewLocation extends Component {
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
    console.log("location: ", input);
    this.setState({ open: input.open })
    var fHf={}
if(input.location.floor) fHf={name:"طبقه",value:input.location.floor}
if(input.location.halfFloor) fHf={name:"نیم طبقه",value:input.location.halfFloor}
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <p>آدرس:  </p>
          <p>ساختمان {input.location.building}، {fHf.name} {fHf.value}, 
          اتاق {input.location.room} </p>
          <p>توضیحات: {input.location.description} </p>
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
          <Modal title="مشخصات مکان"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.viewModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}
export default ViewLocation;
