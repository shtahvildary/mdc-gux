import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid"
import TextField from './TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search'


class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        response: [],
        isTable: true,
            page: 1,
            size: 10,
            skip: 0,
      };
    }
    componentWillReceiveProps(){
      var size = this.state.size;
        // var page=this.state.page++
        var page = this.state.page
        // var limits = { limit, skip }
      if (window.innerWidth > 768) this.setState({ isTable: true }, () => {
        // limits.isTable = true
    })
    else this.setState({ isTable: false }, () => {
        // limits.isTable = false
    })
    this.setState({model:this.props.model,size,page})
    }
    callApi = async (model,payload) => {
        const response = await axios({
          method: "post",
          url: global.serverAddress + "/"+model+"/search",
          headers: { "x-access-token": localStorage.getItem("token") },
          data:payload
        });
        if (response.status !== 200) throw Error(response.message);
        return response;
      };
    fillData(input,page,size){
      var page = this.state.page++

      var size = this.state.size 
      // var skip = this.state.size * page

      input.limit=this.state.limit
          input.size=size
          input.isTable=this.state.isTable
          this.callApi(this.state.model,input)
          .then(res => {
            console.log(res)
            this.props.searchResult({ response: res.data,size,page },()=>{
          if (!this.state.response.finished)
          this.fillData(input)

            })
          })
          .catch(err => console.log(err));

    }
    tbxReadValue(input) {
        this.setState(input,()=>{
          this.fillData(input,0,10)
          
          // input.limit=this.state.limit
          // input.skip=this.state.skip
          // input.isTable=this.state.isTable
          // this.callApi(this.state.model,input)
          // .then(res => {
          //   console.log(res)
          //   this.props.searchResult({ response: res.data })
          // })
          // .catch(err => console.log(err));
        });
      }
      render() {
        return (
          <div>
              <Grid item xs={12}>
            <TextField  type="search" margin="normal" xs id="search" label="جستجو"   InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}change={(event) => this.tbxReadValue(event)}/>
            </Grid>
          </div>
        );
      }
    }

export default Search;