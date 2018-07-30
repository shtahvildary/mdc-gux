import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditVlan from "./EditVlan";
import ViewVlan from "./ViewVlan";
import Search from "./components/Search";
import NewVlan from "./NewVlan";
import { Link, Route, Switch } from 'react-router-dom';


class vlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {},
      search: ""
    };
   
    
    
  }
  callApi = async (path, payload) => {
    // console.log(path,payload)
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/vlans/" + path,
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
        this.setState({ response: res.data.vlans }, () => {
          this.setTblData();
        });
      })
      .catch(err => console.log(err));
  }

  setTblData() {
    <SimpleTable
      addNew={<NewVlan />}
      columns={this.state.response.columns}
      data={this.state.response.vlansData}
    />;
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .then(res => {
          this.setState({ response: res.data.vlans }, () => {
            this.searchResult();
          });
        })
        .catch(err => console.log(err));
    });
  }

  showEdit(n) {
    this.setState({ editComponent: <EditVlan vlan={n} open="true" /> });
  }
  showView(n) {
    this.setState({ viewComponent: <ViewVlan vlan={n} open="true" /> });
  }
  searchResult(tblData) {

    this.setState({ response: tblData.response.vlans }, () => { });
    console.log(tblData);
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <Search model="vlans" searchResult={this.searchResult.bind(this)} />
        {this.state.editComponent}
        {this.state.viewComponent}
        <Card
          pageName="شبکه های مجازی"
          content={
            <SimpleTable
              // addNew={this.addNew.bind(this)}
              addNew={{path:"/شبکه مجازی جدید",link:"/شبکه مجازی جدید",component:NewVlan}}
              columns={this.state.response.columns}
              data={this.state.response.vlansData}
              showView={this.showView.bind(this)}
              showEdit={this.showEdit.bind(this)}
            />
          }
        />
      </div>
    );
  }
}

export default vlans;
