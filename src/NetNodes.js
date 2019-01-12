import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditNetNode from "./EditNetNode";
import ViewNetNode from "./ViewNetNode";
import Search from "./components/Search";
import NewNetNode from "./NewNetNode";
import ExpantionPanel from "./components/ExpantionPanel";

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
  componentWillMount() {
    var path;
    var Table;
    // if (window.innerWidth < 768)
    if(window.innerWidth>768) 
    {
      Table = true
      path = "all"
    }

    else {
      Table = false;
      path = "all/details"
    }


    this.callApi(path, "")
      .then(res => {
        this.setState(({ response: res.data.netNodes,Table }), () => {
          console.log("response: ", this.state.response)

          this.setData(Table);
        });
      })
      .catch(err => console.log(err));

  }

  setData(Table) {

    if (Table)
      return (<SimpleTable
        addNew={<NewNetNode />}
        columns={this.state.response.columns}
        data={this.state.response.netNodesData}
      />);
    else
      return (<ExpantionPanel items={this.state.response} />)
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
  refreshPage(close) {
    if (close)
      // this.setState({open:!this.state.open},()=>{console.log("open: ",this.state.open)})
      window.location.reload()
    // this.componentWillMount()
  }
  showEdit(n) {
    console.log("n: ", n)
    this.setState({ editComponent: <EditNetNode netNode={n} open="true" close={this.refreshPage.bind(this)} /> }, () => { });
  }
  showView(n) {
    console.log("n: ", n)

    this.setState({ viewComponent: <ViewNetNode netNode={n} open="true" /> });
  }
  searchResult(tblData) {
    console.log("tblData: ", tblData)
    this.setState({ response: tblData.response.netNodes }, () => { });
  }
  delete(arrayOfIds) {
    // <DeleteObjects modal='NetNodes' arrayOfIds={arrayOfIds}/>
    this.callApi("delete", { arrayOfIds })
  }
  disconnect(n) {
    this.callApi("disconnect", n)
  }
  render() {
    if (this.state.Table)
      return (
        <div>
          <Search model="netnodes" searchResult={this.searchResult.bind(this)} />
          {this.state.editComponent}
          {this.state.viewComponent}
          {(global.userType < 2) ? (
            <Card
              pageName="نودها"
              content={
                <SimpleTable
                  addNew={{ path: "/نود جدید", link: "/نود جدید", component: NewNetNode }}
                  columns={this.state.response.columns}
                  data={this.state.response.netNodesData}
                  showView={this.showView.bind(this)}
                  showEdit={this.showEdit.bind(this)}
                  disconnect={this.disconnect.bind(this)}
                  delete={this.delete.bind(this)}
                />
              }
            />
          ) : (
              <Card
                pageName="نودها"
                content={
                  <SimpleTable
                    addNew={{ path: "/نود جدید", link: "/نود جدید", component: NewNetNode }}
                    columns={this.state.response.columns}
                    data={this.state.response.netNodesData}
                    showView={this.showView.bind(this)}
                    showEdit={this.showEdit.bind(this)}
                    disconnect={this.disconnect.bind(this)}
                  />
                }
              />
            )}
        </div>
      );
    else {
      
      return (
        <div>
        <Search model="netnodes" searchResult={this.searchResult.bind(this)} />
        <Card
          pageName="نودها"
          content={
            <ExpantionPanel items={this.state.response} />
          }
        />
        </div>
      )
    }
  }
}

export default netNodes;
