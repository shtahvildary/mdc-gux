// import React, { Component } from "react";
import React from 'react';
import ExpantionPanel from "./ExpantionPanel";
import SimpleTable from "./Table";
import { instanceOf } from 'prop-types';
import Grid from '@material-ui/core/Grid';

// import Card from "./Card"

class showData extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isTable: true,
            page:0,
            size:10,
            data:[],
            
        }
    }

//////////
componentWillMount(){
    console.log("this.props: ",this.props)
    // this.setState({page:this.state.page++},()=>{
    //     console.log("this.page: ",this.page)
    
  var limit=this.state.size;
  var skip=this.state.size*this.state.page
//   var data;
  var data=this.state.data
  var info={limit,skip}
  var component;
  var del;
  if( global.userType < 2)  del=this.props.delete

    if(window.innerWidth>768) this.setState({isTable:true},()=>{
        data.push(this.props.data)
        info.path="all"
        this.props.nextPage(info)
        // this.props.path("all",limit,skip)
         component=
        <SimpleTable
            addNew={this.props.addNew}
            columns={this.props.columns}
            data={this.props.data}
            showView={this.props.showView}
            showEdit={this.props.showEdit}
            disconnect={this.props.disconnect}
            delete={del}
          />

    })
    else this.setState({isTable:false},()=>{
        info.path="all/details"
        this.props.nextPage(info)
        // this.props.path("all/details",limit,skip)
     component= <ExpantionPanel items={this.props.ExpantionPanelItems} />


    // })
})
this.setState({component},()=>{})

}
// componentWillReceiveProps(newProps){
//     if (newProps.data === this.state.data) return;

//     console.log("props.data: ",this.newProps)

//   var data=this.state.data
//   if(this.newProps.data)
//   {
//   data.push(this.newProps.data)
//   this.setState({data},()=>{
//       console.log("new data: ",this.state.data)

//   })
// }

// }



nextPage(page){
    console.log("page: ",page)
}

render(){
    console.log("this.state:",this.state)
    // if (this.state.isTable)
    return(
        //   <SimpleTable
        //     addNew={this.props.addNew}
        //     columns={this.props.columns}
        //     data={this.state.data}
        //     showView={this.props.showView}
        //     showEdit={this.props.showEdit}
        //     disconnect={this.props.disconnect}
        //     delete={del}
        //   />
      <Grid item xs={6} >

        {this.state.component}
        </Grid>
    // )
    // else return(
        // <ExpantionPanel items={this.props.ExpantionPanelItems} />
    )
}

}
export default showData;