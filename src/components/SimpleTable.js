import React from "react";
import _ from "lodash";
import Linkfy from "react-linkify";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",

   paper:{ ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,}
  },
  table: {
    minWidth: 700
  }
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      root: "",
      table: "",
      columns: [],
      data: [],
      col: [],
      row: [],
      columnComponents: [<TableCell>default</TableCell>]
    };
  }
  componentWillMount() {
    // this.setState({ data: this.props.data, columns: this.props.columns });
  }
  componentWillReceiveProps(newProps) {
    var col = [];
    var rows = [];

    _.mapKeys(newProps.columns, (value, key) => {
      col.push({ column: key, title: value });
    });
   
    newProps.data.map((d, i) => {
    
      rows.push(JSON.parse(JSON.stringify(col))) ;
      _.mapKeys(d, (value, key) => {
        var j = rows[i].findIndex(ci => ci.column === key);
        if (j !== -1) rows[i][j].data = value;
      });
      col.map(c => {

        if (rows[i].findIndex(ri => ri.column === c.column) === -1)
          rows[i].push({ column: c.column, data: "-" });
      });
    });
    this.setState({ data: newProps.data, col, rows }, () => {
      this.setColumns();
      this.setRows();
     
    });
  }
  setColumns() {
    var columnComponents = this.state.col.map(c => {
      return <TableCell>{c.title}</TableCell>;
    });
    this.setState({ columnComponents }, () => {});
  }
  setRows() {
    console.log("this.state.rows: ",this.state.rows)
    var rowsComponets = this.state.rows.map(r => {
      var thisRow = r.map(cell => {
        
        return <TableCell>{cell.data}</TableCell>;
      });
      return <TableRow>{thisRow}</TableRow>;
    });
    this.setState({ rowsComponets }, () => {
      console.log(this.state.rowsComponets)
    });
    
  }
  render() {
    const { classes } =this.props;
    return (
      <Paper className={classes.root.paper} elevation={1}>
      <Linkfy>
        <Typography variant="headline" component="h3">
        {/* جدول */}
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>{this.state.columnComponents}</TableRow>
          </TableHead>
          <TableBody>{this.state.rowsComponets}</TableBody>
        </Table>
        </Linkfy>
        </Paper>
      
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.object.isRequired
};
export default withStyles(styles)(SimpleTable);
