import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditNetNode from "./EditNetNode";
import ViewNetNode from "./ViewNetNode";
import Search from "./components/Search";

class netNodes extends Component {
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
      url: global.serverAddress + "/netnodes/" + path,
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  componentWillMount() {
    this.callApi("all", "")
      .then(res => {
        this.setState({ response: res.data.netNodes }, () => {
          this.setTblData();
        });
      })
      .catch(err => console.log(err));
  }

  setTblData() {
    <SimpleTable
      columns={this.state.response.columns}
      data={this.state.response.netNodesData}
    />;
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .then(res => {
          this.setState({ response: res.data.netNodes }, () => {
            this.searchResult();
          });
        })
        .catch(err => console.log(err));
    });
  }
  showEdit(n) {
    this.setState({ editComponent: <EditNetNode netNode={n} /> });
    console.log("edit");

    console.log(n);
  }
  showView(n) {
    this.setState({ viewComponent: <ViewNetNode netNode={n} /> });
  }
  searchResult(tblData) {
    this.setState({ response: tblData.response.netNodes }, () => {});
    console.log(tblData.response.netNodes);
  }
  render() {
    return (
      <div>
        <Search model="netnodes" searchResult={this.searchResult.bind(this)} />
        {this.state.editComponent}
        <Card
          pageName="نودها"
          content={
            <SimpleTable
              columns={this.state.response.columns}
              data={this.state.response.netNodesData}
              // editComponent={<EditNetNode/>}
              showView={this.showView.bind(this)}
              showEdit={this.showEdit.bind(this)}
            />
          }
        />
      </div>
    );
  }
}

export default netNodes;
