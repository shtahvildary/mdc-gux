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
      };
    }
    componentWillReceiveProps(){
    this.setState({model:this.props.model})
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
    tbxReadValue(input) {
        this.setState(input,()=>{
          this.callApi(this.state.model,input)
          .then(res => {
            console.log(res)
            this.props.searchResult({ response: res.data })
          })
          .catch(err => console.log(err));
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