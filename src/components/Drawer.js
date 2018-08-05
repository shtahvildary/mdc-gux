import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import MainAppBar from './AppBar'
// import { ListItem, ListItemText } from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import NetNodes from '../NetNodes';
import Switches from '../Switches';
import Locations from '../Locations';
import Vlans from '../Vlans';
import Devices from '../Devices';
import NewNetNode from '../NewNetNode';
import NewSwitch from '../NewSwitch';
import NewLocation from '../NewLocation';
import NewVlan from '../NewVlan';
import NewDevice from '../NewDevice';
import NewDeviceType from '../NewDeviceType';
import DashboardPage from '../Dashboard';
// import Index from '../Index'

import Dashboard from '@material-ui/icons/Dashboard';
import Computer from '@material-ui/icons/Computer'
import DevicesIcon from '@material-ui/icons/Devices'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NewDepartment from '../NewDepartment';
import Register from '../Register';
// import computerIcon from '../Icons/twotone-computer-24px'


const drawerWidth = 240;

const styles = theme => ({
  ///////////
  direction:"rtl",
  ///////////

  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      // color:theme.color
    }),
  },
  appBarShift: {
    marginRight: drawerWidth,
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
    //my color
    // backgroundColor: "#e6f9ff",
    ////
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

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      managementOpen:false,
      elements: []
    };
  }
  handleClickManagement = () => {
    this.setState(state => ({ managementOpen: !state.managementOpen }));
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  componentWillMount(event) {

    this.setState({ elements: this.props.elements }, () => {

    })
  }

  render() {
    const { classes, theme } = this.props;
// console.log('theme: ',theme)
    return (
      <div className={classes.root}>
      {/* <div className={classes.root}> */}
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              <MainAppBar />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
          <Link to="/">
          <ListItem>
          <ListItemIcon>
            <Dashboard />
            </ListItemIcon>
            <ListItemText>داشبورد</ListItemText>          
          </ListItem>
          </Link>
          <Divider />

          <Link to="/نودها">
          <ListItem>
          <ListItemIcon>
            <Computer />
            </ListItemIcon>
            <ListItemText>نود ها  </ListItemText>
          </ListItem>
          </Link>

          <Link to="/سوییچها">
          <ListItem>
          <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText>سوییچها</ListItemText>
          </ListItem>
          </Link>
          
          <Link to="/مکانها">
          <ListItem>
          <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText>مکانها</ListItemText>
          </ListItem>
          </Link>
          
          <Link to="/شبکه های مجازی">
          <ListItem>
          <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText>شبکه های مجازی</ListItemText>
          </ListItem>
          </Link>

          <Link to="/سخت افزارها">
          <ListItem>
          <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText>سخت افزارها</ListItemText>
          </ListItem>
          </Link>
          {global.userType<20?(
          <Link to="/کاربران">
          <ListItem>
          <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText>کاربران</ListItemText>
          </ListItem>
          </Link>
          ):("")
          }
          
          <Divider />
{global.userType<2?(
  <div>

        <ListItem button onClick={this.handleClickManagement}>
            <ListItemIcon>
            <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="ابزارهای مدیریتی" />
            {this.state.managementOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.managementOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                    



          <Link to="/نود جدید">
          <ListItem button className={classes.nested}>
          <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText inset primary="افزودن نود جدید"/>
          </ListItem>
          </Link>

          <Link to="/سوییچ جدید">
          <ListItem button className={classes.nested}>
          <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText inset primary="افزودن سوییچ جدید"/>
          </ListItem>
          </Link>
          
          <Link to="/مکان جدید">
          <ListItem button className={classes.nested}>
          <ListItemIcon>
            <Dashboard />
            </ListItemIcon>
            <ListItemText>افزودن مکان جدید</ListItemText>
          </ListItem>
          </Link>
          <Link to="/شبکه مجازی جدید">
          <ListItem button className={classes.nested}>
          <ListItemIcon>
            <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="افزودن شبکه مجازی جدید"/>
          </ListItem>
          </Link>
          
          <Link to="/سخت افزار جدید">
          <ListItem button className={classes.nested}>
          <ListItemIcon>
            <DevicesIcon />
            </ListItemIcon>
            <ListItemText inset primary="افزودن سخت افزار جدید"/>
          </ListItem>
          </Link>

          <Link to="/نوع جدید" >
          <ListItem button className={classes.nested}>
          <ListItemIcon>
            <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="افزودن نوع جدید"/>
          </ListItem>
          </Link>

          <Link to="/واحد جدید" >
          <ListItem button className={classes.nested}>
          <ListItemIcon>
            <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="افزودن واحد جدید"/>
          </ListItem>
          </Link>
{global.userType===0?(
          <Link to="/کاربر جدید" >
          <ListItem button className={classes.nested}>
          <ListItemIcon>
            <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="افزودن کاربر جدید"/>
          </ListItem>
          </Link>
          ):("")}

           </List>
          </Collapse>
          </div>
          ):("")}

          <Divider />
          
          

</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
{/*           
// {if this.state.elements.length!==0{return(elements.map(e=>{
//   render(){e}
// }))}} */}
<div className="App">
        
          <Switch>
            <Route exact path="/" component={DashboardPage}/>
            <Route path="/سوییچها" component={Switches} />
            <Route path="/نودها" component={NetNodes} />
            <Route path="/مکانها" component={Locations} />
            <Route path="/شبکه های مجازی" component={Vlans} />
            <Route path="/سخت افزارها" component={Devices} />
            {/* <Route path="/کاربران" component={Users} /> */}
            <Route path="/نود جدید" component={NewNetNode} />
            <Route path="/سوییچ جدید" component={NewSwitch} />
            <Route path="/مکان جدید" component={NewLocation} />
            <Route path="/شبکه مجازی جدید" component={NewVlan} />
            <Route path="/سخت افزار جدید" component={NewDevice} />
            <Route path="/نوع جدید" component={NewDeviceType} />
            <Route path="/واحد جدید" component={NewDepartment} />
            <Route path="/کاربر جدید" component={Register} />
          </Switch>
         
          </div>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles( styles,{ withTheme: true })(MiniDrawer);
