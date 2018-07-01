import React, { Component } from 'react';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import AppBar from '@material-ui/core/AppBar';
// // import RaisedButton from 'material-ui/RaisedButton';
// import RaisedButton from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import axios from 'axios';
// import indexPage from './index';
// // import {Router,BrowserHistory} from 'react-router';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import indexPage from './index';
// import {Router,BrowserHistory} from 'react-router';

class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField
           hintText="نام کاربری را وارد کنید"
           floatingLabelText="نام کاربری"
           onChange = {this.handleChange('username')}
           />
         <br/>
           <TextField type="password"
             hintText="کلمه عبور را وارد کنید"
             floatingLabelText="کلمه عبور"
             onChange = {this.handleChange('password')}
             />
           <br/>

           
          {/* <Button label="وارد شوید" color="inherit" onClick={(event) => this.handleClick(event)}/> */}

           <Button label="وارد شوید" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      loginComponent:localloginComponent,
      // loginRole:'student'
    }
  }
  handleClick(event){
    var self = this;
    var payload={
      "username":this.state.username,
	    "password":this.state.password,
    }
    console.log("username: ",this.state.username);
    console.log("password: ",this.state.password);

    axios.post(global.serverAddress+'/users/login', payload)
   .then(function (response) {
     console.log("response: ",response);
     if(response.status === 200){
       console.log("Login successfull");
       localStorage.setItem('token',response.data.token)
       console.log(localStorage.getItem('token'))
       var indexScreen=[];
      //  indexScreen.push(<redirect to='/App1' />)
       indexScreen.push(<indexPage appContext={self.props.appContext} />)
       self.props.appContext.setState({loginPage:[],indexScreen:indexScreen})
       
     }
     else
       {
         console.log("Username does not exists");
       alert("نام کاربری یا رمز عبور اشتباه است");
      }
     
   })
   .catch(function (error) {
     console.log(error);
   });
  }
 

 
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };


  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="ورود"
           />
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;