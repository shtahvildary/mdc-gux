import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from './components/Card'
import Search from './components/Search';
import NewSwitch from './NewSwitch';
import ViewSwitch from './ViewSwitch';
import EditSwitch from './EditSwitch';

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
  showEdit(n) {
    this.setState({ editComponent: <EditSwitch sw={n} open="true" /> });
  }
  showView(n) {
    this.setState({ viewComponent: <ViewSwitch sw={n} open="true" /> });
  }
  searchResult(tblData){
    this.setState({ response: tblData.response.switches }, () => {})

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
        <Search model="Switches" searchResult={this.searchResult.bind(this)}/>
        {this.state.editComponent}
        {this.state.viewComponent}
        <Card pageName="سوییچها" content={
          <SimpleTable
          addNew={{path:"/سوییچ جدید",link:"/سوییچ جدید",component:NewSwitch}}
          columns={this.state.response.columns}
          data={this.state.response.switchesData}
          showView={this.showView.bind(this)}
          showEdit={this.showEdit.bind(this)}
          />}
        />
      </div>
    );
  }
}

export default switchesTable;
