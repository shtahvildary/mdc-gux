import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Card from './components/Card'
import TextField from './components/TextField';


class netNodeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {},
      search:'',
    };
  }
  callApi = async (path,payload) => {
    console.log(path,payload)
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/netnodes/"+path,
      headers: { "x-access-token": localStorage.getItem("token") },
      data:payload
    });
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);

    return response;
  };
  componentWillMount() {

    this.callApi("all","")
      .then(res => {
        this.setState({ response: res.data.netNodes }, () => {
          this.setTblData()
        });
      })
      .catch(err => console.log(err));
  }


  setTblData() {
    <SimpleTable
      columns={this.state.response.columns}
      data={this.state.response.netNodesData}
    />
  }

  tbxReadValue(input) {
    this.setState(input,()=>{
      
      this.callApi("search",input)
      .then(res => {
        this.setState({ response: res.data.netNodes }, () => {
          
          console.log("this.state.response",this.state.response)
          this.setTblData()
        });
      })
      .catch(err => console.log(err));
    });
  }
  render() {

    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="info sima" />
        </MuiThemeProvider>
        <TextField id="search" label="جستجو" change={this.tbxReadValue.bind(this)} />
        
        <Card pageName="نودها" content={<SimpleTable
          columns={this.state.response.columns}
          data={this.state.response.netNodesData}
        />} />
      </div>
    );
  }
}

export default netNodeTable;
