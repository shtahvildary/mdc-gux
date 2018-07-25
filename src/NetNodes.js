import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditNetNode from "./EditNetNode";
import ViewNetNode from "./ViewNetNode";
import Search from "./components/Search";
import NewNetNode from "./NewNetNode";
import { Link, Route, Switch } from 'react-router-dom';


class netNodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {},
      search: ""
    };
    <div>
    <Switch>
          <Route path="/نود جدید" component={NewNetNode} />
        </Switch>
        </div>
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
      addNew={<NewNetNode />}
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
  addNew() {
    console.log("hiiiii")
    // var path=addNew.path
    // var route = []
    // route.push(
    //   <div>
    //     <Link to="/نود جدید" />
    //   </div>
    // )
    return (
      <Link to="/نود جدید" />
      
    )
  }
  showEdit(n) {
    this.setState({ editComponent: <EditNetNode netNode={n} open="true" /> });
  }
  showView(n) {
    this.setState({ viewComponent: <ViewNetNode netNode={n} open="true" /> });
  }
  searchResult(tblData) {
    this.setState({ response: tblData.response.netNodes }, () => { });
    console.log(tblData.response.netNodes);
  }
  render() {
        
    return (
      <div>
        <Search model="netnodes" searchResult={this.searchResult.bind(this)} />
        {this.state.editComponent}
        {this.state.viewComponent}
        <Card
          pageName="نودها"
          content={
            <SimpleTable
              addNew={this.addNew.bind(this)}
              columns={this.state.response.columns}
              data={this.state.response.netNodesData}
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
