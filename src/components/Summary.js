import React from 'react';
import axios from "axios";
import ShowData from "./ShowData"

class summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           model:"",
           rowsCount:3
        }
    }
    componentWillMount() {
        this.setState({model:this.props.model},()=>{
            this.callApi(this.state.model,{rowsCount:this.state.rowsCount}).then(res=>{
                console.log(res.data)
                var data=res.data
                this.setState(data,()=>{})
            })
        })
    }

    callApi=async(model,payload)=>{
        const response=await axios({
            method:"post",
            url:global.serverAddress+"/"+model+"/summary",
            headers: { "x-access-token": localStorage.getItem("token") },
            data:payload
        })
        if (response.status !== 200) throw Error(response.message);
        return response;
    }
    
    render() {
        return (
            <ShowData
                  data={this.state.data}
                  dataLength={this.state.dataLength}
                  finished={true}
                  ExpantionPanel={true}
                />
        )
    }
}
export default summary;