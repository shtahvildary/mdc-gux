import React, { Component } from "react";
import axios from "axios";
import Card from "./components/Card";
import EditNetNode from "./EditNetNode";
import ViewNetNode from "./ViewNetNode";
import Search from "./components/Search";
import NewNetNode from "./NewNetNode";
import ShowData from "./components/ShowData"

class netNodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {},
      search: "",
      open: "false",
      Table: true,
    };
  }
  callApi = async (path, payload) => {
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
  nextPage(payload) {
    this.callApi("all", payload)
      .then(res => {
        if (res.data.netNode.dataLength) this.setState({dataLength:res.data.netNode.dataLength},()=>{})
          this.setState(({ response: res.data.netNodes ,search:false,payload}), () => {
        // console.log("dataLength: ",this.state.response.dataLength)
          });
      })
      .catch(err => console.log(err));
  }

  refreshPage(close) {
    if (close)
      // this.setState({open:!this.state.open},()=>{console.log("open: ",this.state.open)})
      window.location.reload()
    // this.componentWillMount()
  }
  showEdit(n) {
    this.setState({ editComponent: <EditNetNode netNode={n} open="true" close={this.refreshPage.bind(this)} /> }, () => { });
  }
  showView(n) {
    this.setState({ viewComponent: <ViewNetNode netNode={n} open="true" /> });
  }
  searchResult(tblData) {
    this.setState({ response: tblData.response.netNodes,page:tblData.page ,search:true}, () => {

     });
  }
  delete(arrayOfIds) {
    this.callApi("delete", { arrayOfIds })
  }
  disconnect(n) {
    this.callApi("disconnect", n)
  }
  render() {
    var clear
    if (this.state.search&&(this.state.page==1)) clear=true
      return (
        <div>
          <Search model="netnodes"  searchResult={this.searchResult.bind(this)} />
          {this.state.editComponent}
          {this.state.viewComponent}
            <Card
            pageName="نودها"
            content={
              <ShowData
                  addNew={{ path: "/نود جدید", link: "/نود جدید", component: NewNetNode }}
                  columns={this.state.response.columns}
                  data={this.state.response.netNodesData}
                  dataLength={this.state.response.dataLength}
                  finished={this.state.response.finished}
                  showView={this.showView.bind(this)}
                  showEdit={this.showEdit.bind(this)}
                  disconnect={this.disconnect.bind(this)}
                  delete={this.delete.bind(this)}
                  nextPage={this.nextPage.bind(this)}
                  clear={clear}
                />
              }
            />
        </div>
      )
    } 
  
}

export default netNodes;
