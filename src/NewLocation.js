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
  
  
    
  
class NewLocation extends Component {
    constructor(props) {
        
        super(props);
        const { classes } = this.props;
        this.state={
            name:'',
            description:'',
        }
        var localComponent = []
        localComponent.push(
            <MuiThemeProvider>
                <div>
                {/* <TextField id="search" label="Search field" type="search" className={classes.textField} margin="normal"/> */}
                {/* <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/> */}
                نام<TextField id="name" floatingLabelText="نام" onChange={this.handleChange('name')}/>
                    <br/>
                    توضیحات: <TextField id="description" floatingLabelText="توضیحات" onChange={this.handleChange('description')}/>
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
    if( this.state.name.length>0 && this.state.description.length>0  ){
      var payload={
      "name":this.state.name,
      "description":this.state.description,
      }
      
    // const response = await axios({method:'post',url:global.serverAddress+'/switches/new',headers:{"x-access-token":localStorage.getItem('token')},payload});
this.callApi(payload)
      // axios.post(global.serverAddress+'/switches/new', payload)
     .then(function (response) {
       console.log(response);
       if(response.status === 200){
         console.log("add new location is OK :D");
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
        const response = await axios({method:'post',url:global.serverAddress+'/locations/new',headers:{"x-access-token":localStorage.getItem('token')},data:payload});
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
export default withStyles(styles)(NewLocation)
// export default NewNetNode


