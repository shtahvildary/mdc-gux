import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
global.serverAddress = "http://localhost:5000/api"

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
