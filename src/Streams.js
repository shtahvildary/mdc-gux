import React, { Component } from "react";
import axios from "axios";
import SimpleTable from "./components/Table";
import Card from "./components/Card";
import EditStream from "./EditStream";
import ViewStream from "./ViewStream";
import Search from "./components/Search";
import NewStream from "./NewStream";
// import Button from "./components/Button"
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
    console.log("request time",Date.now())

    const response = await axios({
      method: "post",
      url: global.serverAddress + "/streams/" + path,
      headers: { "x-access-token": localStorage.getItem("token") },
      data: payload
    });
    console.log("response time",Date.now())
    // const body = await response;
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  callStreamApi = async (path, streamServer, payload) => {
    const response = await axios({
      method: "post",
      url: "http://" + streamServer + ":8001/api/" + path,
      data: payload
    });
    if (response.status !== 200) throw Error(response.message);
    return response;
  };

  componentWillMount() {
    // var socket = io("http://172.16.16.164:3000")
    var start=Date.now()
    console.log("start component",start)
    this.callApi("all", "")
    .then(res => {
      
      var apiTime=Date.now()
      console.log("call api ",apiTime,apiTime-start)
      this.changeStateBtns(res.data.streams)
    

    // var socket = io("localhost:3000")
    var socket = io("http://localhost:3000")
    socket.on("connection", () => {
      var socketTime=Date.now()
      console.log("connected succ",socketTime,socketTime-apiTime)
    })
    socket.on("changes", (data) => {
      var ind = this.state.response.streamsData.findIndex(i => String(i._id) === String(data.id));
      var { streamsData } = this.state.response;
      if (data.playState === 0) {
        var changePlayState = <IconButton aria-label="play{nameEn}" onClick={event => this.playStream(this.state.response.streamsData[ind])} >
          <PlayIcon />
        </IconButton>
        var playState = "متوقف شده"

      }
      else {
        var changePlayState = <IconButton aria-label="pause{nameEn}" onClick={event => this.pauseStream(this.state.response.streamsData[ind])} >
          <PauseIcon />
        </IconButton>
        var playState = "در حال پخش"
      }
      streamsData[ind].changePlayState = changePlayState;
      streamsData[ind].playStateText = playState;
      var { response } = this.state;
      response.streamsData = streamsData
      this.setState({ response }, () => { })
    })
  })
  .catch(err => console.log(err));
  }
  changeStateBtns(response) {
    // var response = res.data.streams
    response.columns.changePlayState = "تغییر وضعیت"
    var playBtn = []
    var pauseBtn = []

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
  }

  playStream(str) {
    console.log("str:", str)
    if (!str.isMosaic) this.callStreamApi("streams/start", str.streamServer, [{ name: str.nameEn, address: str.address, id: str._id, dshow: 0 }])
    else    //call mosaic
    {
      //example: {"name":"mosaic1","mosaicInputs":[{"name":"out","address":"/Users/shadab/Downloads/video_2017-08-09_18-26-12.mp4"},{"name":"out2","address":"/Users/shadab/Desktop/webstream/ffmpeg/out2.mp4"}]}
      var mosaicInputs = [];
      str.mosaicInputs.map(i => {
        console.log("iiiii", i)
        mosaicInputs.push({ "name": i.name.en, "address": i.address,"streamServer":str.streamServer})
      })
      console.log("mosaicInputs", mosaicInputs)
      this.callStreamApi("mosaic/start", str.streamServer, { name: str.nameEn,  mosaicInputs, id: str._id,dshow: 0 })
    }

  }

  pauseStream(str) {
    if (!str.isMosaic) this.callStreamApi("streams/stop", str.streamServer, { id: str._id, dshow: 0 })
    else    //call mosaic
    {
      var mosaicInputs = [];
      str.mosaicInputs.map(i => {
        mosaicInputs.push(i.address)
      })
      this.callStreamApi("mosaic/stop", str.streamServer, { id: str._id, dshow: 0 })
    }

    ////////////////
  }

  tbxReadValue(input) {
    this.setState(input, () => {
      this.callApi("search", input)
        .catch(err => console.log(err));
    });
  }
  refreshPage(close){
    if(close) window.location.reload()
  }
  showEdit(n) {
    this.setState({ editComponent: <EditStream stream={n} open="true" close={this.refreshPage.bind(this)} />},()=>{});
  }
  showView(n) {
    this.setState({ viewComponent: <ViewStream stream={n} open="true" /> });
  }
  searchResult(tblData) {
    this.changeStateBtns(tblData.response.streams)

    this.setState({ response: tblData.response.streams }, () => { });
  }
  delete(arrayOfIds) {
    this.callApi("delete", { arrayOfIds });
  }
  render() {
    return (
      <div>
        <Search model="streams" searchResult={this.searchResult.bind(this)} />
        <div><a href="http://localhost:4000">مشاهده استریم ها</a></div>
        {/* <div><a href="http://172.16.16.163:4000">مشاهده استریم ها</a></div> */}
        {this.state.editComponent}
        {this.state.viewComponent}
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
