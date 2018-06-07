import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function WallNode(){
  return(<div><h1>hello...WallNode</h1></div>)    
  }
  
  function Rackroom(){
    return(<div><h1>hello...Rackroom</h1></div>)    
    }
    function Switchs(){
      return(<div><h1>hello...Switchs</h1></div>)    
      }

class App extends Component {


  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios({method:'post',url:global.serverAddress+'/api/switches/all',headers:{"x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1YWZlNmFkZWZhMDRhYzA5MzRiNzE3OGIiLCJiYXNlZENvbGxlY3Rpb24iOiJVc2VyIiwiX2lkIjoiNWFmZTZhZGVmYTA0YWMwOTM0YjcxNzhiIiwiaWF0IjoxNTI2NjIyOTQyfQ.DmsdAjhDV8xMqEc-up2ET2QkhiL-LJj1z9YLHuu0n7o"}});
    // const response = await fetch('http://localhost:5000/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <p className="App-intro">{this.state.response}</p>


        <WallNode/>
        <Rackroom/>
        <Switchs/>
      </div>
    );
  }
}


export default App;
