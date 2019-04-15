import React from "react";
import Card from "./components/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link, Route, Switch } from "react-router-dom";
import Switches from "./Switches";
import NetNodes from "./NetNodes";
import Locations from "./Locations";
import Vlans from "./Vlans";
import "./App.css";
import Streams from "./Streams";
import Summary from "./components/Summary";

function Dashboard() {
  var localComponents = [];
  localComponents.push(
    <Paper className="myPaper">
      <div>
        <Grid container spacing={24}>
          <Grid item xs>
            <Card
              pageName="نودها"
              content={
                <div>
                  {/* <p>نمایش لیست نودها</p> */}
                  <Summary model="netNodes"/>
                  <Link to="/نودها">بیشتر...</Link>
                </div>
              }
            />
          </Grid>
          <Grid item xs>
            <Card
              pageName="سوییچها"
              content={
                <div>
                  <Summary model="switches"/>
                  <Link to="/سوییچها">بیشتر...</Link>
                </div>
              }
            />
          </Grid>
          </Grid>

          <Grid container spacing={24}>

           <Grid item xs>
            <Card
              pageName="مکانها"
              content={
                <div>
                  {/* <p>نمایش لیست مکانها</p> */}
                  <Summary model="locations"/>

                  <Link to="/مکانها">بیشتر...</Link>
                </div>
              }
            />
          </Grid>
          <Grid item xs>
            <Card
              pageName="VLANها"
              content={
                <div>
                  {/* <p>نمایش لیست VLANها</p> */}
                  <Summary model="vlans"/>

                  <Link to="/VLANها">بیشتر...</Link>
                </div>
              }
            />
          </Grid>
          </Grid>
          <Grid container spacing={24}>

          <Grid item xs>
            <Card
              pageName="استریم ها"
              content={
                <div>
                  <Summary model="streams"/>
                  <Link to="/استریم ها">بیشتر...</Link>
                </div>
              }
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
  return (
    <div>
    <Switch>
      <Route path="/سوییچها" component={Switches} />
      <Route path="/نودها" component={NetNodes} />
      <Route path="/مکانها" component={Locations} />
      <Route path="/VLANها" component={Vlans} />
      <Route path="/استریم ها" component={Streams} />

    </Switch>
  </div>,
  localComponents);
}

export default Dashboard;
