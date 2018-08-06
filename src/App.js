import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Drawer from './components/Drawer'
import './App.css';
// import LoginScreen from './Loginscreen';
import Login from './Login';
// import Header from './components/Header';
// import { MuiThemeable } from '@material-ui/core/styles/MuiThemeable';




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
    
  }
  render() {
    if (!localStorage.getItem('token'))
      return [
        // <muiThemeable>
          // <Header/>,
        <div className={["App-login"]}>,
        <Login  appContext={this} />,
          </div>
          // {/* </muiThemeable> */}
          
      ]
    else
      return [
        <div dir="rtl" >,
        {/* <muiThemeable> */}
          {/* <Header /> */}
          <Drawer  />,
        {/* </muiThemeable> */}
        </div>,
      ];
  }
}

export default App;