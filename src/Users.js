import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";
import Search from "./components/Search";
import NewUser from "./NewUser";


class users extends Component {
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
      url: global.serverAddress + "/users/" + path,
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
        this.setState({ response: res.data.users }, () => {
          this.setTblData();
        });
      })
      .catch(err => console.log(err));
  }

  setTblData() {
    return(<SimpleTable
      addNew={<NewUser />}
      columns={this.state.response.columns}
      data={this.state.response.usersData}
    />)
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .then(res => {
          this.setState({ response: res.data.users }, () => {
            this.searchResult();
          });
        })
        .catch(err => console.log(err));
    });
  }
refreshPage(close){
  if(close) window.location.reload()
}
  showEdit(n) {
    this.setState({ editComponent: <EditUser user={n} open="true" close={this.refreshPage.bind(this)} />},()=>{});
  }
  showView(n) {
    this.setState({ viewComponent: <ViewUser user={n} open="true" /> });
  }
  searchResult(tblData) {
    this.setState({ response: tblData.response.users }, () => { });
  }
  delete(arrayOfIds){this.callApi("delete",{arrayOfIds})}
  render() {
    return (
      <div>
        <Search model="users" searchResult={this.searchResult.bind(this)} />
        {this.state.editComponent}
        {this.state.viewComponent}
        <Card
          pageName="کاربران"
          content={
            <SimpleTable
              // addNew={this.addNew.bind(this)}
              addNew={{path:"/کاربر جدید",link:"/کاربر جدید",component:NewUser}}
              columns={this.state.response.columns}
              data={this.state.response.usersData}
              showView={this.showView.bind(this)}
              showEdit={this.showEdit.bind(this)}
              delete={this.delete.bind(this)}
            />
          }
        />
      </div>
    );
  }
}

export default users;
