import React from "react";
import _ from "lodash";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
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
    console.log("data:", this.props.data)
    console.log("columns:", this.props.columns)
    this.setState({ data: this.props.data, columns: this.props.columns });
  }
  componentWillReceiveProps(newProps) {
    var col = [];
    var rows = [];

    _.mapKeys(this.state.columns, (value, key) => {
      col.push({ column: key, title: value });
    });
    //rows=>>
    newProps.data.map((d, i) => {
      rows.push(col);
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
    var rowsComponets = this.state.rows.map(r => {
      var thisRow = r.map(cell => {
        return <TableCell>{cell.data}</TableCell>;
      });
      return <TableRow>{thisRow}</TableRow>;
    });
    this.setState({ rowsComponets }, () => {});
  }
  render() {
    return (
      <Paper className={this.state.root}>
        <Table className={this.state.table}>
          <TableHead>
            <TableRow>{this.state.columnComponents}</TableRow>
          </TableHead>
          <TableBody>{this.state.rowsComponets}</TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  data: PropTypes.object.isRequired
};
export default withStyles(styles)(SimpleTable);
