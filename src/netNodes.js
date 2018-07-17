import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from './components/Card'

class netNodeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {}
    };
  }
  callApi = async () => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/netnodes/all",
      headers: { "x-access-token": localStorage.getItem("token") }
    });
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);

    return response;
  };
  componentWillMount() {
    
    this.callApi()
    .then(res => {
      this.setState({ response: res.data.netNodes },()=>{
          this.setTblData()

        });
      })
      .catch(err => console.log(err));
  }
  // componentDidMount(){
  //     <SimpleTable
  //     columns={this.state.response.columns}
  //     data={this.state.response.netNodesData}
  //   />
  // }

  setTblData(){
  //   var table={netNodeTable:<SimpleTable
  //   columns={this.state.response.columns}
  //   data={this.state.response.netNodesData}
  // />}
    
  //   this.setState({table},()=>{})
    var localComponent = []
    localComponent.push(
      <SimpleTable
      columns={this.state.response.columns}
      data={this.state.response.netNodesData}
    />)
    this.setState({ localComponent },()=>{
      console.log("localComponent: ",this.state.localComponent)
    })

  }
  render() {
    
      return(
    //   <SimpleTable
    //   columns={this.state.response.columns}
    //   data={this.state.response.netNodesData}
    // />
    <div>
    {/* <MuiThemeProvider>
      <AppBar title="info sima" />
    </MuiThemeProvider> */}
    <Card pageName="نودها" content={this.state.localComponent}/>
  </div>
    );
  }
}

export default netNodeTable;
