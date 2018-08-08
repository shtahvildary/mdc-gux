// import LoginScreen from '../Loginscreen';
import LoginScreen from '../Login';

import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
// import Typography from 'material-ui/styles/typography'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      root: {
        flexGrow: 1,
      },
      flex: {
        flex: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      token: props.token,

    }
  }
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this} />);
    this.setState({
      loginPage: loginPage
    })
  }
  // const { classes } = props;
  render() {
    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <IconButton className={this.state.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={this.state.flex}>
              فناوری اطلاعات سیما
          </Typography>
            <Button color="inherit" onClick={(event) => this.handleClick(event)}>خروج</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  handleClick(event) {
    localStorage.removeItem('token')
    console.log(this.setState.loginPage)
    return (

      <div>

        {this.state.loginPage}</div>)

  }
}

// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default ButtonAppBar;
// export default withStyles(styles)(ButtonAppBar);