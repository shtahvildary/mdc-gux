import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import './index.css';

// import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



  const styles = theme => ({
      button:{

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
  
  
    
  
class NewSwitch extends Component {
    constructor(props) {
        
        super(props);
        const { classes } = this.props;
        this.state={

            name:'',
            ip:'',
            description:'',
            model:'', 
            diagramUrl:'',
            location:'',
          
        }
        var localComponent = []
        localComponent.push(
            <MuiThemeProvider>
                <div>
                {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
                {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
                نام سوییچ<TextField id="name" floatingLabelText="نام سوییچ" onChange={this.handleChange('name')}/>
                    <br/>
                     IP سوییچ:<TextField id="ip" floatingLabelText="IP سوییچ" onChange={this.handleChange('ip')}/>
                    <br/>
                    توضیحات: <TextField id="description" floatingLabelText="توضیحات" onChange={this.handleChange('description')}/>
                    <br/>
                     مدل سوییچ:<TextField id="model" floatingLabelText="مدل سوییچ" onChange={this.handleChange('model')}/>
                    <br/>
                    نمودار PRTG: <TextField id="diagramUrl" floatingLabelText="نمودار PRTG" onChange={this.handleChange('diagramUrl')}/>
                    <br/>
                    مکان: <TextField id="location" floatingLabelText="مکان" onChange={this.handleChange('location')}/>
                    <br/>
                    <Button label="ذخیره" primary={true} style={styles.button} onClick={(event) => this.handleClick(event)}/>
                </div>
             </MuiThemeProvider>
        )
        this.state={
            localComponent:localComponent,

        }
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
      handleClick(event){
    var self = this;
   
   
    //To be done:check for empty values before hitting submit
    if( this.state.name.length>0 && this.state.ip.length>0 && this.state.description.length>0&& this.state.model.length>0&&  this.state.diagramUrl.length>0&&  this.state.location.length>0){
      var payload={
      "name":this.state.name,
      "ip":this.state.ip,
      "description":this.state.description,
      "model":this.state.model,
      "diagramUrl":this.state.diagramUrl,
      "location":this.state.location,
      }
      
    // const response = await axios({method:'post',url:global.serverAddress+'/switches/new',headers:{"x-access-token":localStorage.getItem('token')},payload});
this.callApi(payload)
      // axios.post(global.serverAddress+'/switches/new', payload)
     .then(function (response) {
       console.log(response);
       if(response.status === 200){
         console.log("add new switch is OK :D");
       }
       else{
         console.log("some error ocurred",response.status);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }
      }
      callApi = async (payload) => {
        const response = await axios({method:'post',url:global.serverAddress+'/switches/new',headers:{"x-access-token":localStorage.getItem('token')},data:payload});
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
        console.log(body)
    
        return body;
      };

    render(){
        return(
            <div>
            <MuiThemeProvider>
                <AppBar title="salam"/>
            </MuiThemeProvider>
            {this.state.localComponent}
    </div>
        )
    }
}
export default withStyles(styles)(NewSwitch)
// export default NewNetNode


