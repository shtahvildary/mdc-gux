import React, { Component } from 'react';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import AppBar from '@material-ui/core/AppBar';
import MyButton from './components/Button';
import MyTextField from './components/TextField';
import axios from 'axios';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Card from "./components/Card";
import './App.css'
// import red from '@material-ui/core/colors/blue';
// import {Router,BrowserHistory} from 'react-router';

class Login extends Component {
  constructor(props){
    super(props);
  
    this.state={
      username:'',
      password:'',
      loginComponent:[],
      // loginRole:'student'
    }
  }
  componentWillMount(){
    const { classes } = this.props;

    var loginComponent=[];

    loginComponent.push(
      <MuiThemeProvider>
        <div >
        <form className={classes.container} noValidate autoComplete="off">
        <MyTextField id="username" label="نام کاربری" change={this.tbxReadValue.bind(this)}/>  
         <br/>
         <MyTextField id="password" label="کلمه عبور" type="password" autoComplete="current-password" change = {this.tbxReadValue.bind(this)}/>
           <br/> 
           <MyButton label="وارد شوید" click={this.enter.bind(this)}/>
       </form>
       </div>
       </MuiThemeProvider>
    )
    this.setState({loginComponent})
  }
  enter(event){
    // handleClick(event){
    var self = this;
    var payload={
      "username":this.state.username,
	    "password":this.state.password,
    }
   
    axios.post(global.serverAddress+'/users/login', payload)
   .then(function (response) {
     if(response.status === 200){
       console.log("Login successfull");
       localStorage.setItem('token',response.data.token)
       var indexScreen=[];
      //  indexScreen.push(<redirect to='/App1' />)
       indexScreen.push(<indexPage appContext={self.props.appContext} />)
       self.props.appContext.setState({loginPage:[],indexScreen:indexScreen}) 
     }    
   })
   .catch(function (error) {
    alert("نام کاربری یا رمز عبور اشتباه است");
     console.log(error);
   });
  }
tbxReadValue(input){this.setState(input) }

    // setUN(value) {this.setState({username: value});};
    // setPW(value) {this.setState({password: value});};
    
  render() {
    return (
      // <div className="App-Login">
        <Card pageName="ورود" content={this.state.loginComponent}/>
    // </div>
    );
  }
}

const style = {
  margin: 15,
  // body:{ /* background-color: rgb(2, 2, 2); */
  //   // backgroundImage: url("./pics/IMG_302122.jpg"),
  //   backgroundSize: "cover",
  //   backgroundRepeat:"repeat",
  //   backgroundPosition: "center",
  //   backgroundColor:red,
  //   height: "100%",
  //   /* height: 150px; */
  //   /* padding: 20px; */
  //   position:"center",
  //   color: "white",
  //   direction: "rtl",
  //   /* backdrop-filter:yellow; */
  //   display: "block"}
};
export default withStyles(style)(Login)
