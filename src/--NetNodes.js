import React, { Component } from 'react';

import axios from 'axios';
import SimpleTable from './components/Table'


function netNodeTable(props) {
  // function netNodeTable(props) {
  // const { classes } = props;

  console.log("hiiiiii")

axios({method:'post',url:global.serverAddress+'/netnodes/all',headers:{"x-access-token":localStorage.getItem('token')}})
.then(response=>{
    console.log(response.status)

  if(response.status===200){
    console.log(response)
    return(
  //   <SimpleTable columns={[{location:"مکان",switchPort:"شماره پورت سوییچ",switchId:"سوییچ",cabelNumber:"شماره کابل",patchPanelPort:"شماره patch panel"}]} data={[
  //     {
  //         "location": "5b261ae413c47e20fbb61d59",
  //         "switchPort": "32",
  //         "switchId": "5afe796f44ac79270a15e45a",
  //         "cabelNumber": "32",
  //         "patchPanelPort": "R5P612",
         
  //     },{
  //       "location": "5b261ae413c47e20fbb61d59",
  //       "switchPort": "32",
  //       "switchId": "5afe796f44ac79270a15e45a",
  //       "cabelNumber": "32",
  //       "patchPanelPort": "R5P612",
  //       "updatedAt": "2018-06-17T12:58:01.583Z",
  //   }
  // ]} parentContent={this} appContext={this.props.appContext}/>
  
  
  // <SimpleTable  parentContent={this} appContext={this.props.appContext}/>
  <h1>hi</h1>
  // <SimpleTable  columns={[{location:"مکان",switchPort:"شماره پورت سوییچ",switchId:"سوییچ",cabelNumber:"شماره کابل",patchPanelPort:"شماره patch panel"}]} data={response.data.netNodes}/>
)

  }
  // else{
    
  //   return 
  // <h1>no thing</h1>
  // ;
  // }
}).catch(e=>{
  console.log(e)
  return 
  <h1>error</h1>

})
}

export default netNodeTable;