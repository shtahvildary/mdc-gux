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
import { ListItem, ListItemText } from '@material-ui/core/List';

import NetNodes from '../NetNodes';
import Switches from '../Switches';
import NewNetNode from '../NewNetNode';
import NewSwitch from '../NewSwitch';
import NewLocation from '../NewLocation';
import NewVlan from '../NewVlan';
import NewDevice from '../NewDevice';
import NewDeviceType from '../NewDeviceType';
// import Index from '../Index'


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
      elements: []
    };
  }
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
          <li><Link to="/">داشبورد</Link></li>
          <Divider />

          <li><Link to="/نودها">نود ها</Link></li>
          <li><Link to="/سوییچها">سوییچ ها</Link></li>
          <Divider />
          
          <li><Link to="/نود جدید">افزودن نود جدید</Link></li>
          <li><Link to="/سوییچ جدید">افزودن سوییج جدید</Link></li>
          <li><Link to="/مکان جدید">افزودن مکان جدید</Link></li>
          <li><Link to="/شبکه مجازی جدید">افزودن شبکه مجازی جدید</Link></li>
          <li><Link to="/سخت افزار جدید">افزودن سخت افزار جدید</Link></li>
          <li><Link to="/نوع جدید" >افزودن نوع جدید</Link></li>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
{/*           
// {if this.state.elements.length!==0{return(elements.map(e=>{
//   render(){e}
// }))}} */}
<div className="App">
        
          <Switch>
            {/* <Route exact path="/" component={Index}/> */}
            <Route path="/سوییچها" component={Switches} />
            <Route path="/نودها" component={NetNodes} />
            <Route path="/نود جدید" component={NewNetNode} />
            <Route path="/سوییچ جدید" component={NewSwitch} />
            <Route path="/مکان جدید" component={NewLocation} />
            <Route path="/شبکه مجازی جدید" component={NewVlan} />
            <Route path="/سخت افزار جدید" component={NewDevice} />
            <Route path="/نوع جدید" component={NewDeviceType} />
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
