import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditLocation from "./EditLocation";
import ViewLocation from "./ViewLocation";
import Search from "./components/Search";
import NewLocation from "./NewLocation";

class locations extends Component {
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
      url: global.serverAddress + "/locations/" + path,
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
        this.setState({ response: res.data.locations }, () => {
          this.setTblData();
        });
      })
      .catch(err => console.log(err));
  }

  setTblData() {
    return(<SimpleTable
      addNew={<NewLocation />}
      columns={this.state.response.columns}
      data={this.state.response.locationsData}
    />);
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .then(res => {
          this.setState({ response: res.data.locations }, () => {
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
      this.setState({ editComponent: <EditLocation location={n} open="true" close={this.refreshPage.bind(this)} />},()=>{});
    }  
  showView(n) {
    this.setState({ viewComponent: <ViewLocation location={n} open="true" /> });
  }
  searchResult(tblData) {

    this.setState({ response: tblData.response.locations }, () => { });
    console.log(tblData);
  }
  delete(arrayOfIds){
    console.log("arrayOfIds: ",arrayOfIds)   
     this.callApi("delete",{arrayOfIds})    
   }
  render() {
    console.log(this.state)
    return (
      <div>
        <Search model="locations" searchResult={this.searchResult.bind(this)} />
        {this.state.editComponent}
        {this.state.viewComponent}
        <Card
          pageName="مکان ها"
          content={
            <SimpleTable
              // addNew={this.addNew.bind(this)}
              addNew={{path:"/مکان جدید",link:"/مکان جدید",component:NewLocation}}
              columns={this.state.response.columns}
              data={this.state.response.locationsData}
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

export default locations;
