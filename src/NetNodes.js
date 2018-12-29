import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditNetNode from "./EditNetNode";
import ViewNetNode from "./ViewNetNode";
import Search from "./components/Search";
import NewNetNode from "./NewNetNode";

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
    this.callApi("all","")
      .then(res => {
        console.log("netNodes: ",res.data.netNodes)
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
  refreshPage(close){
    if(close) 
    window.location.reload()
    // this.componentWillMount()
  }
  showEdit(n) {
    this.setState({ editComponent: <EditNetNode netNode={n} open="true" close={this.refreshPage.bind(this)} />},()=>{});
  }
  showView(n) {
    console.log("n: ",n)

    this.setState({ viewComponent: <ViewNetNode netNode={n} open="true" /> });
  }
  searchResult(tblData) {
    this.setState({ response: tblData.response.netNodes }, () => { });
    console.log(tblData.response.netNodes);
  }
  delete(arrayOfIds){
     // <DeleteObjects modal='NetNodes' arrayOfIds={arrayOfIds}/>
    this.callApi("delete",{arrayOfIds}) 
  }
  disconnect(n){
   this.callApi("disconnect",n) 
 }
  render() {

    return (
      <div>
        <Search model="netnodes" searchResult={this.searchResult.bind(this)} />
        {this.state.editComponent}
        {this.state.viewComponent}
        {global.userType<2?(

          <Card
            pageName="نودها"
            content={
              <SimpleTable
                addNew={{path:"/نود جدید",link:"/نود جدید",component:NewNetNode}}
                columns={this.state.response.columns}
                data={this.state.response.netNodesData}
                showView={this.showView.bind(this)}
                showEdit={this.showEdit.bind(this)}
                disconnect={this.disconnect.bind(this)}
             delete={this.delete.bind(this)}
              />
            }
          />
          ):(
          <Card
            pageName="نودها"
            content={
              <SimpleTable
                addNew={{path:"/نود جدید",link:"/نود جدید",component:NewNetNode}}
                columns={this.state.response.columns}
                data={this.state.response.netNodesData}
                showView={this.showView.bind(this)}
                showEdit={this.showEdit.bind(this)}
                disconnect={this.disconnect.bind(this)}
                // orderBy={this.state.response.netNodesData.}
              />
            }
          />
        )}
      </div>
    );
  }
}

export default netNodes;
