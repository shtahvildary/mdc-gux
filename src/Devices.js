import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditDevice from "./EditDevice";
import ViewDevice from "./ViewDevice";
import Search from "./components/Search";
import NewDevice from "./NewDevice";
import { Link, Route, Switch } from 'react-router-dom';


class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {},
      search: ""
    };
   
    
    
  }
  callApi = async (path, payload) => {
    console.log(path,payload)
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/devices/" + path,
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  componentWillMount() {
    this.callApi("all","")
      .then(res => {
        this.setState({ response: res.data.devices }, () => {
          this.setTblData();
        });
      })
      .catch(err => console.log(err));
  }

  setTblData() {
    {console.log("res.data: ",this.state.response)}

    <SimpleTable
      addNew={<NewDevice />}
      columns={this.state.response.columns}
      data={this.state.response.devicesData}
    />;
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .then(res => {
          this.setState({ response: res.data.devices }, () => {
            this.searchResult();
          });
        })
        .catch(err => console.log(err));
    });
  }

  showEdit(n) {
    this.setState({ editComponent: <EditDevice device={n} open="true" /> });
  }
  showView(n) {
    this.setState({ viewComponent: <ViewDevice device={n} open="true" /> });
  }
  searchResult(tblData) {
    console.log(tblData);
    this.setState({ response: tblData.response.devices }, () => { });
  }
  render() {
    console.log(this.state.response)
    return (
      <div>
        <Search model="devices" searchResult={this.searchResult.bind(this)} />
        {this.state.editComponent}
        {this.state.viewComponent}
        <Card
          pageName="سخت افزارها"
          content={
            <SimpleTable
              // addNew={this.addNew.bind(this)}
              addNew={{path:"/سخت افزار جدید",link:"/سخت افزار جدید",component:NewDevice}}
              columns={this.state.response.columns}
              data={this.state.response.devicesData}
              showView={this.showView.bind(this)}
              showEdit={this.showEdit.bind(this)}
            />
          }
        />
      </div>
    );
  }
}

export default Devices;
