import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Drawer from './components/Drawer'
import './App.css';
// import LoginScreen from './Loginscreen';
import LoginScreen from './Login';
import Header from './components/Header';



// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      response: '',
      loginPage: [],
      elements: []
    }
  }
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen  appContext={this} />);
    this.setState({
      loginPage: loginPage
    })
  }
  render() {
    if (!localStorage.getItem('token'))
      return (

        <div className={["App-login"]}>

          {this.state.loginPage}</div>)
    else

      return (
        <div dir="rtl">
        <muiThemeable>
          <Header />
          <Drawer  />
        </muiThemeable>
        </div>
      );
  }
}

export default App;