import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';

global.serverAddress = "http://localhost:5000/api";

 var callApi=async () => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/users/me', headers: { "x-access-token": localStorage.getItem('token') } });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  callApi().then(res=>{
    global.userType =res.data.userType
  })
ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <CssBaseline />
            <App />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
