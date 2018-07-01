import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from './AppBar'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginScreen from './Loginscreen';
import NetNodes from './NetNodes';
import Switches from './Switches';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import { muiThemeable } from '@material-ui/core/styles/muiThemeable';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

  
  function Rackroom(){
    return(<div><h1>hello...Rackroom</h1></div>)    
    }
    // function Switches(){
    //   return(<div><h1>hello...Switchs</h1></div>)    
    //   }

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
          <muiThemeable>
          <div className="App">
 {/* <AppBar classes={{
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }}
}/>  */}
 <AppBar/>

        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <div><h1>...net nodes...</h1></div>
        <NetNodes appContext={this}/>
        <Rackroom/>
        <div><h1>...Switches...</h1></div>
        <Switches/>
      </div>
</muiThemeable>
    );
  }
}

export default App;