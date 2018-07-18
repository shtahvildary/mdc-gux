import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Card from './components/Card'

class switchesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {}
    };
  }
  callApi = async () => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/switches/all",
      headers: { "x-access-token": localStorage.getItem("token") }
    });
    const body = await response;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  componentWillMount() {

    this.callApi()
      .then(res => {
        this.setState({ response: res.data.switches }, () => {
          this.setTblData()
          console.log("Switches response: ", this.state.response)
        });
      })
      .catch(err => console.log(err));
  }

  setTblData() {
    var table = {
      switchesTable: <SimpleTable
        columns={this.state.response.columns}
        data={this.state.response.switchesData}
      />
    }

    this.setState({ table }, () => { })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="info sima" />
        </MuiThemeProvider>
        <Card pageName="سوییچها" content={
          <SimpleTable
            columns={this.state.response.columns}
            data={this.state.response.switchesData}
          />}
        />
      </div>
    );
  }
}

export default switchesTable;
