import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Card from './components/Card'

class netNodeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {}
    };
   
  };
  componentWillMount() {

    this.callApi()
      .then(res => {
        this.setState({ response: res.data.netNodes }, () => {
// console.log('response: ',this.state.response)

          this.setCardData()
        });
      })
      .catch(err => console.log(err));
      this.callApi()
      .then(res => {
        this.setState({ response: res.data.netNodes }, () => {
console.log('response: ',this.state.response)

          this.setCardData()
        });
      })
      .catch(err => console.log(err));
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
  }


  setCardData() {
    if(!this.state.response.netNodes) return
    
    {this.state.response.netNodesData.map(d=>{
      console.log(d.ip)
      {<Card pageName="نودها" content={
        <p>{d.ip}</p>}/>}
      })}
  }
  render() {
// console.log(this.state.response)
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="info sima" />
        </MuiThemeProvider>
        

        {/* {this.state.response.netNodesData.map(d=>{
        <Card pageName="نودها" content={
          <p>{d.ip}</p>}/>
        })} */}
        {this.setCardData()}
          
         
      </div>
    );
  }
}

export default netNodeTable;
