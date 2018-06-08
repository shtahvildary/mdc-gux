import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginScreen from './Loginscreen';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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


 

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios({method:'post',url:global.serverAddress+'/switches/all',headers:{"x-access-token":localStorage.getItem('token')}});
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body)

    return body;
  };

// class App extends Component {
  constructor(props){
    super(props);
    this.state={
      response:'',
      loginPage:[],
      
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen appContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    if(!localStorage.getItem('token'))
    return (
      <div className="App">
        {this.state.loginPage}</div>)
        else
        return(
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