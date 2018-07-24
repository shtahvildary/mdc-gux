import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid"
import TextField from './TextField';


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
        // console.log(path,payload)
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
          console.log("input: ",input)
          console.log("model: ",this.state.model)
          this.callApi(this.state.model,input)
          .then(res => {
            this.props.searchResult({ response: res.data })
          })
          .catch(err => console.log(err));
        });
      }
      render() {
        return (
          <div>
              <Grid xs={24}>
            <TextField  type="search" margin="normal" xs id="search" label="جستجو" change={(event) => this.tbxReadValue(event)}/>
            </Grid>
          </div>
        );
      }
    }

export default Search;