import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';


// global.serverAddress = "http://172.16.17.191:5000/api";
global.serverAddress = "http://172.16.17.195:5000/api";
// global.serverAddress = "http://192.168.1.10:5000/api";
// global.serverAddress = "http://localhost:5000/api";
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
