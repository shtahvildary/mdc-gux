import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditStream from "./EditStream";
// import ViewStream from "./ViewStream";
import Search from "./components/Search";
import NewStream from "./NewStream";
import Button from "./components/Button"
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';


import io from "socket.io-client";




class Streams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      columns: {},
      search: ""
    };
  }
  callApi = async (path, payload) => {
    const response = await axios({
      method: "post",
      url: global.serverAddress + "/streams/" + path,
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);
    return response;
  };
  
  callStreamApi = async (path,streamServer, payload) => {
    const response = await axios({
      method: "post",
      url: "http://"+streamServer + ":8001/api/streams/" + path,
      data: payload
    });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  componentWillMount() {
    var socket = io("http://localhost:3000")
    socket.on("connection", () => {
      console.log("connected succ")
    })
    socket.on("changes", (data) => {
      var ind=this.state.response.streamsData.findIndex(i=>String(i._id)===String(data.id));
      var {streamsData}=this.state.response;
      if(data.playState===0){
        var changePlayState=<IconButton aria-label="play{nameEn}" onClick={event => this.playStream(this.state.response.streamsData[ind])} >
            <PlayIcon />
          </IconButton>
         var playState="متوقف شده"

      }
      else{
        var changePlayState=<IconButton aria-label="pause{nameEn}" onClick={event => this.pauseStream(this.state.response.streamsData[ind])} >
            <PauseIcon />
          </IconButton>
         var playState="در حال پخش"
      }
      streamsData[ind].changePlayState=changePlayState;
      streamsData[ind].playStateText=playState;
      var {response}=this.state;
      response.streamsData=streamsData
      this.setState({response},()=>{})
    })
    this.callApi("all", "")
      .then(res => {
        var response = res.data.streams
        response.columns.changePlayState = "تغییر وضعیت"
        var playBtn = []
        var pauseBtn = []



        // click={this.saveBtnClick.bind(this)}



        response.streamsData.map((str, index) => {
          playBtn = <IconButton aria-label="play{nameEn}" onClick={event => this.playStream(str)} >
            <PlayIcon />
          </IconButton>
          pauseBtn = <IconButton aria-label="pause{nameEn}" onClick={event => this.pauseStream(str)} >
            <PauseIcon />
          </IconButton>
          if (str.playStateValue === 0) {
            str.changePlayState = playBtn
          }
          else if (str.playStateValue === 1) {
            str.changePlayState = pauseBtn
          }
        })

        this.setState({ response }, () => {
        });
      })
      .catch(err => console.log(err));
  }

  playStream(str) {
    this.callStreamApi("start",str.streamServer,[{name:str.nameEn,address:str.address,id:str._id,dshow:0}])
  }

  pauseStream(str){
    this.callStreamApi("stop",str.streamServer,{id:str._id,dshow:0})
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .then(res => {
          this.setState({ response: res.data.streams }, () => {
            this.searchResult();
          });
        })
        .catch(err => console.log(err));
    });
  }

  showEdit(n) {
    this.setState({ editComponent: <EditStream stream={n} open="true" /> });
  }
  showView(n) {
    // this.setState({ viewComponent: <ViewStream stream={n} open="true" /> });
  }
  searchResult(tblData) {
    this.setState({ response: tblData.response.streams }, () => { });
  }
  delete(arrayOfIds) {
    this.callApi("delete", { arrayOfIds });
  }
  render() {
    return (
      <div>
        <Search model="streams" searchResult={this.searchResult.bind(this)} />

        {this.state.editComponent}
        {/* {this.state.viewComponent} */}
        <Card

          pageName="استریم ها"
          content={
            <SimpleTable
              // addNew={this.addNew.bind(this)}
              addNew={{
                path: "/استریم جدید",
                link: "/استریم جدید",
                component: NewStream
              }}
              columns={this.state.response.columns}
              data={this.state.response.streamsData}
              showView={this.showView.bind(this)}
              showEdit={this.showEdit.bind(this)}
              delete={this.delete.bind(this)}
            />
          }
        />
      </div>
    );
  }
}

export default Streams;
