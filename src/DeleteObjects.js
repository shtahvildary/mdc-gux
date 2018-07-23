import React, { Component } from "react";
import axios from 'axios';
import './index.css';

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';


  function DeleteObjects(arrayOfIds) {
    
      var payload = {arrayOfIds}
      try{
    const response =  axios({ method: 'post', url: global.serverAddress + '/netNodes/delete', headers: { "x-access-token": localStorage.getItem('token') }, data: payload });
    if (response.status !== 200) throw Error(response.message);
   
       
          if (response.status === 200) {
            console.log("delete netNode is OK :D");
           
          }
          else {
            console.log("some error ocurred", response.status);
          }
          return response.status
        }
        catch(error) {
          console.log(error);
        };
    }

 

export default DeleteObjects


