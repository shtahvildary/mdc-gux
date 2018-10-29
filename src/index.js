import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import Dashboard from './Dashboard';
import netNodes from './NetNodes';
import locations from './Locations';
import vlans from './Vlans';
import Devices from './Devices';
import NewNetNode from './NewNetNode';
import NewSwitch from './NewSwitch';
import NewLocation from './NewLocation';
import NewDepartment from './NewDepartment';
import NewUser from './NewUser';
// import Register from './Register';
import Switches from './Switches';
import NewVlan from './NewVlan';
import NewDevice from './NewDevice';
import NewDeviceType from './NewDeviceType';

global.serverAddress = "http://localhost:5000/api";
// global.streamServerAddress = "http://localhost:8001/api";

 var callApi=async () => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/users/me', headers: { "x-access-token": localStorage.getItem('token') } });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  callApi().then(res=>{
    console.log("res: ",res)
    global.userType =res.data.userType
  })
ReactDOM.render(
    // routes,
    <BrowserRouter>
        <React.Fragment>
            <CssBaseline />
            <App />
        </React.Fragment>
  </BrowserRouter>
  ,
    document.getElementById('root'),
    
);
// registerServiceWorker();
