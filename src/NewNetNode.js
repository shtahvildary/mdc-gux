import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Menu from './components/Menu'
import './index.css';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';


// import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  button: {

    margin: 15,
  },


  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});




class NewNetNode extends Component {
  constructor(props) {

    super(props);
    const { classes } = this.props;
    this.state = {

      cableNumber: '',
      switchId: '',
      switchPort: '',
      vlanId: '',
      type: '',
      location: '',

      //for use in menu:
      vlans: [],
      switches: [],
      locations: [],
      types:[]
    }

  }
  setId(selectedId) {
    this.setState(selectedId, () => {
    })
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleClick(event) {
    // var self = this;
    console.log('this.state: ', this.state)

    //To be done:check for empty values before hitting submit
    if (this.state.patchPanelNumber.length > 0 &&
      this.state.cableNumber.length > 0 &&
      this.state.switchId.length > 0 &&
      this.state.switchPort.length > 0 &&
      this.state.vlanId.length > 0 &&
      this.state.type.length > 0 &&
      this.state.location.length > 0) {
      var payload = {
        "patchPanelPort": this.state.patchPanelNumber,
        "cableNumber": this.state.cableNumber,
        "switchId": this.state.switchId,
        "switchPort": this.state.switchPort,
        "vlan": this.state.vlanId,
        "type": this.state.type,
        "location": this.state.location,
      }
      this.callApi(payload)
        // axios.post(global.serverAddress+'/switches/new', payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            console.log("add new netNode is OK :D");
          }
          else {
            console.log("some error ocurred", response.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("Input field value is missing");
    }

  }
  callApi = async (payload) => {
    const response = await axios({ method: 'post', url: global.serverAddress + '/netNodes/new', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body)

    return body;
  };

  callApiMenus = async (model) => {
    var response = await axios({ method: 'post', url: global.serverAddress + '/' + model + '/all/names', headers: { "x-access-token": localStorage.getItem('token') } });
    // const body = await response.json();
    if (response.status !== 200) throw Error(response.message);

    return response;
  };
  componentWillMount() {
    var vlans, switches, locations;
    this.callApiMenus('vlans')
      .then(res => {
        vlans = res.data.vlans
        this.callApiMenus('switches').then(res => {
          switches = res.data.switches
          this.callApiMenus('locations').then(res => {
            locations = res.data.locations
            this.setState({ vlans, switches, locations }, () => {

              var localComponent = []
              var types=[{name:'pc',_id:5},{name:'pc',_id:5},]
              localComponent.push(
                <MuiThemeProvider>
                  <div>


                    {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
                    {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
                    شماره patch panel<TextField id="patchPanelNumber" floatingLabelText="شماره patch panel" onChange={this.handleChange('patchPanelNumber')} />
                    <br />
                    شماره کابل:<TextField id="cableNumber" floatingLabelText="شماره کابل" onChange={this.handleChange('cableNumber')} />
                    <br />
                    شبکه مجازی: <Menu id="vlanId" items={this.state.vlans} selectedId={this.setId.bind(this)}/>

                    <br />
                    سوییچ: <Menu id="switchId" items={this.state.switches} selectedId={this.setId.bind(this)} />
                    <br />
                    شماره پورت سوییچ:<TextField id="switchPort" floatingLabelText="شماره پورت سوییچ" onChange={this.handleChange('switchPort')} />
                    <br />
                    نوع: <Menu id="type" items={this.state.types} selectedId={this.setId.bind(this)} />
                    {/* نوع: <Menu id="type" floatingLabelText="نوع" onChange={this.handleChange('type')} /> */}
                    <br />
                    مکان: <Menu id="location" items={this.state.locations} selectedId={this.setId.bind(this)} />
                    <br />
                    <Button label="ذخیره" primary={true} style={styles.button} onClick={(event) => this.handleClick(event)} />
                  </div>
                </MuiThemeProvider >
              )
              this.setState({ localComponent: localComponent })

            });
          })
        })

      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="info sima" />
        </MuiThemeProvider>
        {this.state.localComponent}
      </div>
    )
  }
}

export default withStyles(styles)(NewNetNode)
// export default NewNetNode


