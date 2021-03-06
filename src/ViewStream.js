import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./App.css"
import "./index.css";
import Modal from "./components/Modal";
import Paper from "@material-ui/core/Paper";
import moment from "moment-jalaali";

class ViewStream extends Component {
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
    console.log("input.stream.changeStateTime: ",input.stream.changeStateTime)
    var localComponent = [];
    this.setState({ open: input.open })
    if(input.stream.isMosaic===1){
      var mosaicInputs=[];
      input.stream.mosaicInputs.map(i=>{
      mosaicInputs.push(i.name.fa)
      })
    }
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <p>نام فارسی:  {input.stream.nameFa}</p>
          <p>نام انگلیسی: {input.stream.nameEn} </p>
          <p>آی پی سرور استریم: {input.stream.streamServer}</p>
          <p>وضعیت: {input.stream.playStateText}</p>
          <p>زمان تغییر وضعیت: {input.stream.changeStateTime?(moment(input.stream.changeStateTime).format('jYY/jMM/jD,h:mm:ss,a')):("-")}</p>
          {input.stream.isMosaic? (<p>لیست شبکه ها: {mosaicInputs.toString()} <br/>ابعاد موزاییک: {input.stream.mosaicDimensions.x}×{input.stream.mosaicDimensions.y}</p>):(<p>آدرس: {input.stream.address}</p>)}
          
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
          <Modal title="مشخصات استریم"
            open={this.state.open}
            components={this.state.localComponent}
            close={this.viewModal.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}
export default ViewStream;
