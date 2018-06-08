import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
global.serverAddress="http://localhost:5000/api"

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
