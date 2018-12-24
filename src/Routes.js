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

const routes=(
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Dashboard}/>
    <Route path="/سوییچها" component={Switches} />
    <Route path="/نودها" component={netNodes} />
    <Route path="/مکانها" component={locations} />
    <Route path="/VLANها" component={vlans} />
    <Route path="/سخت افزارها" component={Devices} />
    {/* <Route path="/کاربران" component={Users} /> */}
    <Route path="/نود جدید" component={NewNetNode} />
    <Route path="/سوییچ جدید" component={NewSwitch} />
    <Route path="/مکان جدید" component={NewLocation} />
    <Route path="/VLAN جدید" component={NewVlan} />
    <Route path="/سخت افزار جدید" component={NewDevice} />
    <Route path="/نوع جدید" component={NewDeviceType} />
    <Route path="/واحد جدید" component={NewDepartment} />
    <Route path="/کاربر جدید" component={NewUser} />
    {/* <Route path="/کاربر جدید" component={Register} /> */}
  </Switch>
  </BrowserRouter>
  )

  ReactDOM.render(routes
    // <BrowserRouter>
        // <React.Fragment>
            // <CssBaseline />
            // <App />
        // </React.Fragment>
//   </BrowserRouter>
  ,
    document.getElementById('root'),
    
);
