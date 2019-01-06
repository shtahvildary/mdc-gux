import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from './components/Button';
import axios from 'axios';
import TextField from './components/TextField';
import Card from './components/Card';
import Checkbox from './components/Checkbox';
import Menu from './components/Menu';

class NewUser extends Component {
  constructor(props) {

    super(props);
    // const { classes } = this.props;
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    }
  }

  fillComponent() {
var userTypes=[{_id:1,name:"مدیر سیستم"},{_id:2,name:"کاربر"}]
    console.log("this.state.permissionsList: ",this.state.permissionsList)
    var localComponent = []
    localComponent.push(
      <MuiThemeProvider>
        <div>
          <TextField id="first_name" label="نام" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="last_name" label="نام خانوادگی" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="username" label="نام کاربری" change={this.tbxReadValue.bind(this)} />
          <br />
          <TextField id="password" label="کلمه عبور" type="password" change={this.tbxReadValue.bind(this)} />
          <br />
          <Menu id="userType" name="نوع کاربر" items={userTypes} selectedId={this.setId.bind(this)} noNullItem={true} />
          <br/>
          <p> مجوزها:</p> 
          {/* {this.state.userType>1?
          ( */}
          <Checkbox id="permissions" items={this.state.permissionsList} selectedItems={this.setPermissions.bind(this)} />
          {/* ):("همه")} */}
          <br/>
          <Button label="ذخیره" click={this.saveBtnClick.bind(this)} />
        </div>
      </MuiThemeProvider>
    )
    this.setState({ localComponent })
  }

  tbxReadValue(input) {
    this.setState(input);
  }
 setPermissions(selectedPermissions){
   console.log("selectedPermissions: ",selectedPermissions)
   this.setState({selectedPermissions},()=>{})}
  setId(selectedId){this.setState((selectedId), () => {console.log("state: ",this.state)})}

  saveBtnClick(event) {
    //To be done:check for empty values before hitting submit
    if (this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.username.length > 0 && this.state.password.length > 0) {
      var payload = {
        "fName": this.state.first_name,
        "lName": this.state.last_name,
        "username": this.state.username,
        "password": this.state.password,
        "permissions":this.state.selectedPermissions,
        "userType":this.state.userType,
      }

      this.callApi('/users/register',payload)
        // axios.post(global.serverAddress+'/switches/new', payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log("add new user is OK :D");
            alert("کاربر جدید با موفقیت ثبت شد.");
            window.location.reload()
          }
          else {
            alert("خطایی رخ داده. لطفا دوباره امتحان کنید.");
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("تمامی فیلدهای ستاره دار را پر کنید.");
    }
  }
  callApi = async (path,payload) => {
    console.log('payload: ',payload)
    const response = await axios({ method: 'post', url: global.serverAddress + path, headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

 

  componentWillMount() {
    
    var permissionsList;
    this.callApi('/permissions/all',"")
    .then(res=>{
      permissionsList=res.data
    
    this.setState({permissionsList},()=>{console.log("this.state",this.state)
    this.fillComponent()
  })   
    })
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="new user" />
        </MuiThemeProvider>
        <Card pageName="افزودن کاربر جدید" content={this.state.localComponent} />
      </div>
    )
  }
}
export default NewUser;


