import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import Drawer from './components/Drawer'
import Drawer from './components/Drawer2'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginScreen from './Loginscreen';
import Switches from './Switches';
import Header from'./components/Header';



// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios({method:'post',url:global.serverAddress+'/switches/all',headers:{"x-access-token":localStorage.getItem('token')}});
    // const body = await response.json();

    if (response.status !== 200) throw Error(response.message);
    console.log(response)

    return response;
  };

// class App extends Component {
  constructor(props){
    super(props);
    this.state={
      response:'',
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
  
        return(
          <muiThemeable>
          <Header/>
        {/* <p className="App-intro">{this.state.response}</p> */}
        {/* <div><h1>...net nodes...</h1></div> */}
        <Drawer elements={[<Switches/>]}/>
        {/* <Drawer elements={[<Switches/>,<Header/>]}/> */}
      
</muiThemeable>
    );
  }
  }


export default App;