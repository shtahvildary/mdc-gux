import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditStream from "./EditStream";
// import ViewDevice from "./ViewDevice";
import Search from "./components/Search";
import NewStream from "./NewStream";
import Button from "./components/Button"

import io from "socket.io-client";




class Streams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {},
      search: ""
    };
  }
  callApi = async (path, payload) => {
    console.log(path, payload);
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/streams/" + path,
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  componentWillMount() {
    var socket=io("http://localhost:3000")
    socket.on("connection",()=>{
      console.log("connected succ")
    })
    socket.on("changes",(data)=>{
      console.log("hiiiiiiii data: ",data)

      //////////
    })
    this.callApi("all", "")
      .then(res => {
        // console.log(res.data)
        this.setState({ response: res.data.streams }, () => {
          // console.log('this.state.response: ',this.state.response)
          this.setTblData();
        });
      })
      .catch(err => console.log(err));
  }

  setTblData() {
    <SimpleTable
      addNew={<NewStream />}
      columns={this.state.response.columns}
      data={this.state.response}
    />;
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .then(res => {
          this.setState({ response: res.data.streams }, () => {
            this.searchResult();
          });
        })
        .catch(err => console.log(err));
    });
  }
  playBtnClick(){
    
  }

  showEdit(n) {
    this.setState({ editComponent: <EditStream stream={n} open="true" /> });
  }
  // showView(n) {
  //   this.setState({ viewComponent: <ViewDevice device={n} open="true" /> });
  // }
  searchResult(tblData) {
    console.log(tblData);
    this.setState({ response: tblData.response.streams }, () => {});
  }
  delete(arrayOfIds) {
    this.callApi("delete", { arrayOfIds });
  }
  render() {
    console.log("this.state.response: ", this.state.response);
    return (
      <div>
        <Search model="streams" searchResult={this.searchResult.bind(this)} />
        <Button label="اجرا"  click={this.playBtnClick.bind(this)} />
        
        {this.state.editComponent}
        {/* {this.state.viewComponent} */}
        <Card
        
          pageName="استریم ها"
          content={
            <SimpleTable
              // addNew={this.addNew.bind(this)}
              addNew={{
                path: "/استریم جدید",
                link: "/استریم جدید",
                component: NewStream
              }}
              columns={this.state.response.columns}
              data={this.state.response.streamsData}
              // showView={this.showView.bind(this)}
              showEdit={this.showEdit.bind(this)}
              delete={this.delete.bind(this)}
            />
          }
        />
      </div>
    );
  }
}

export default Streams;
