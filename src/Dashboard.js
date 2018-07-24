import React, { component } from "react";
import Card from "./components/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link, Route, Switch } from "react-router-dom";
import Switches from "./Switches";
import NetNodes from "./NetNodes";
import "./App.css";

function Dashboard() {
  <div>
    <Switch>
      <Route path="/سوییچها" component={Switches} />
      <Route path="/نودها" component={NetNodes} />
    </Switch>
  </div>;
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
                  <p>نمایش لیست نودها</p>
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
                  <p>"نمایش لیست سوییچها"</p>
                  <Link to="/سوییچها">بیشتر...</Link>
                </div>
              }
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
  return localComponents;
}

export default Dashboard;
