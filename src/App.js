import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
    const response = await fetch('/api/hello');
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
