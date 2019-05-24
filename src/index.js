import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';



// global.serverAddress = "http://172.16.16.164:5000/api";
// global.serverAddress = "http://172.16.17.195:5000/api";
// global.serverAddress = "http://localhost:5000/api";
// global.streamServerAddress = "http://localhost:8001/api";
console.log("process.env",process.env)
if(process.env.REACT_APP_PROJECT_MODE=="Home")
  global.serverAddress = process.env.REACT_APP_URL_HOME;
else if(process.env.REACT_APP_PROJECT_MODE=="Office")
global.serverAddress = process.env.REACT_APP_URL_OFFICE;
else if(process.env.REACT_APP_PROJECT_MODE=="Server")
global.serverAddress = process.env.REACT_APP_URL_SERVER;
global.serverAddress+="/api"





 var callApi=async () => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/users/me', headers: { "x-access-token": localStorage.getItem('token') } });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  callApi().then(res=>{
    console.log("res: ",res,Date.now())
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
