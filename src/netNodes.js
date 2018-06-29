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
    const body = await response;
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    return (
      <SimpleTable
        columns={{
          location: "مکان",
          switchPort: "شماره پورت سوییچ",
          switchId: "سوییچ",
          cabelNumber: "شماره کابل",
          patchPanelPort: "شماره patch panel"
        }}
        data={this.state.response}
      />
    );
  }
}

export default netNodeTable;
