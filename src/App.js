import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import AppBar from './components/AppBar'
import Drawer from './components/Drawer'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginScreen from './Loginscreen';
import NetNodes from './NetNodes';
import Switches from './Switches';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Table2 from './components/Table2';
import NewNetNode from "./NewNetNode"
import netNodeTable from './NetNodes';
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
      selectedPage:'',//10:netNodeTable  , 11:newNetNode  , 20:switchTable  , 21:newSwitch  
      loginPage:[],
      elements:[]

      
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
        switch(this.state){
          case 10: 
          this.elements.push(
            <div>
        <MuiThemeProvider>

            <netNodeTable/> 
         
         </MuiThemeProvider>
        </div>         
          )
          return(
            <muiThemeable>
          <Drawer elements={this.elements}/>
            
          <div className="App">
            {/* <AppBar/> */}
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{this.state.response}</p>
            <div><h1>...net nodes...</h1></div>
          <netNodeTable/>
          </div>
          </muiThemeable>
        )
          case 11: return(
            <muiThemeable>
          <div className="App">
            {/* <AppBar/> */}

            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{this.state.response}</p>
            <div><h1>...net nodes...</h1></div>
          <NewNetNode/>
          </div>
</muiThemeable>

        )
        default:
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
 {/* <AppBar/> */}

<Drawer elements={[<Switches/>]}/>
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <div><h1>...net nodes...</h1></div>
        {/* <NetNodes appContext={this}/> */}
        {/* <Rackroom/> */}
        {/* <div><h1>...Switches...</h1></div> */}
        {/* <Switches/> */}

        {/* <Table2/> */}
        {/* <NewNetNode/> */}
      </div>
</muiThemeable>
    );
  }
  }
}

export default App;