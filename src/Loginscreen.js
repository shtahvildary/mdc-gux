import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MyButton from './components/Button';
// import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import Register from './Register';



class Loginscreen extends Component {
  constructor(props){
    super(props);
    var loginButtons=[];
    loginButtons.push(
      <div>
      <MuiThemeProvider>
        <div>
        <MyButton label="ثبت نام" click={this.handleClick.bind(this)}/>

       </div>
       </MuiThemeProvider>
      </div>
    )
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      loginButtons:loginButtons,
      isLogin:true
    }
  }
  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
    var loginmessage = "اگر هنوز عضو نشده اید لطفا ابتدا ثبت نام کنید";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
  }
  handleClick(event){
    console.log("event");
    var loginmessage;
    if(this.state.isLogin){
      let loginscreen=[];
      loginscreen.push(<Register parentContext={this} appContext={this.props.appContext} />);
      loginmessage = "اگر عضو هستید می توانید وارد شوید";
      let loginButtons=[];
      loginButtons.push(
        <div key="login-button">
        <MuiThemeProvider>
          <div>
             <MyButton label="ورود" click={this.handleClick.bind(this)}/>
         </div>
         </MuiThemeProvider>
        </div>
      )
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     loginButtons:loginButtons,
                     isLogin:false
                   })
    }
    else{
      let loginscreen=[],loginButtons=[];
      
      loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} />);
      loginmessage = "شما هنوز عضو نشده اید. لطفا ابتدا ثبت نام کنید.";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     loginButtons:loginButtons,
                     isLogin:true
                   })
    }
  }
  render() {
    return (
      <div className="loginscreen" key="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          {this.state.loginButtons}
        </div>
      </div>
    );
  }
}


export default Loginscreen;