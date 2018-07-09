import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import AppBar from './components/AppBar'
// import Drawer from './components/Drawer'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginScreen from './Loginscreen';
import NetNodes from './NetNodes';
import Switches from './Switches';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Table2 from './components/Table2';
import NewNetNode from "./NewNetNode"
import netNodeTable from './NetNodes';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import { muiThemeable } from '@material-ui/core/styles/muiThemeable';

import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';

import MainAppBar from './components/AppBar'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});




// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

  
  function Rackroom(){
    return(<div><h1>hello...Rackroom</h1></div>)    
    }
    // function Switches(){
    //   return(<div><h1>hello...Switchs</h1></div>)    
    //   }

    function MiniDrawer (props) {
      
        var open= props.open
        var elements=props.elements
      
      // handleDrawerOpen = () => {
      //   this.setState({ open: true });
      // };
    
      // handleDrawerClose = () => {
      //   this.setState({ open: false });
      // };
      // componentWillMount(event){
        
      //   this.setState({elements:this.props.elements},()=>{
    
      //   })
      
    
      // render() {
        const  classes = props.classes;
        const theme=props.theme;
    
        return (
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
            >
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={HandleDrawerOpen()}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  <MainAppBar/>
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
              }}
              open={open}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={HandleDrawerClose()}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <list>نودهای شبکه</list>
              {/* <List>{mailFolderListItems}</List> */}
              <Divider />
              {/* <List>{otherMailFolderListItems}</List> */}
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Typography noWrap>{this.state.elements}</Typography>
            </main>
          </div>
        );
      // }

      function HandleDrawerOpen ()  {
         open= true ;
      };
    
      function HandleDrawerClose () {
         open= false ;
      };
    }
  // }

    

    

class App extends Component {

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await axios({method:'post',url:global.serverAddress+'/switches/all',headers:{"x-access-token":localStorage.getItem('token')}});
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body)

    return body;
  };

// class App extends Component {
  constructor(props){
    super(props);
    this.state={
      response:'',
      selectedPage:'',//10:netNodeTable  , 11:newNetNode  , 20:switchTable  , 21:newSwitch  
      loginPage:[],
      elements:[]

      
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen appContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    if(!localStorage.getItem('token'))
    return (
      
      <div className="App">
           
        {this.state.loginPage}</div>)
        else
        switch(this.state){
          case 10: 
          this.elements.push(
            <div>
        <MuiThemeProvider>

            <netNodeTable/> 
         
         </MuiThemeProvider>
        </div>         
          )
          return(
            <muiThemeable>
          <Drawer elements={this.elements}/>
            
          <div className="App">
            {/* <AppBar/> */}
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{this.state.response}</p>
            <div><h1>...net nodes...</h1></div>
          <netNodeTable/>
          </div>
          </muiThemeable>
        )
          case 11: return(
            <muiThemeable>
          <div className="App">
            {/* <AppBar/> */}

            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{this.state.response}</p>
            <div><h1>...net nodes...</h1></div>
          <NewNetNode/>
          </div>
</muiThemeable>

        )
        default:
        return(
          <muiThemeable>
          <div className="App">
 {/* <AppBar classes={{
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }}
}/>  */}
 {/* <AppBar/> */}
 {MiniDrawer([<Switches/>])}

{/* <Drawer elements={[<Switches/>]}/> */}
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <div><h1>...net nodes...</h1></div>
        {/* <NetNodes appContext={this}/> */}
        {/* <Rackroom/> */}
        {/* <div><h1>...Switches...</h1></div> */}
        {/* <Switches/> */}

        {/* <Table2/> */}
        {/* <NewNetNode/> */}
      </div>
</muiThemeable>
    );
  }
  }
}

export default App;


