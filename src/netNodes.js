import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";

class netNodeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: []
    };
  }
  componentWillMount() {
    this.callApi()
      .then(res => {
        this.setState({ response: res.data.netNodes });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/netnodes/all",
      headers: { "x-access-token": localStorage.getItem("token") }
    });
    console.log("response: ",response)
    const body = await response;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    console.log("columns: ",this.state.response.columns)
    console.log("netNodesData: ",this.state.response.netNodesData)
    return (
      // <SimpleTable
      //   columns={{
      //     location: "مکان",
      //     switchPort: "شماره پورت سوییچ",
      //     switchId: "سوییچ",
      //     cabelNumber: "شماره کابل",
      //     patchPanelPort: "شماره patch panel"
      //   }}
      //   data={this.state.response}
      // />
      <SimpleTable
      columns={this.state.response.columns}
      data={this.state.response.netNodesData}
    />
    );
  }
}

export default netNodeTable;
