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

import classNames from 'classnames';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import Button from './Button';
import Modal from './Modal';



// let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}



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
    // minWidth: 1020,
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { col,columnComponents,onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
console.log('columnComponents: ',columnComponents)
console.log('col: ',col)
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {/* {columnComponents} */}
          {col.map(column => {
            return (
              <TableCell
                key={column.title}
                // numeric={column.numeric}
                // padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.title ? order : false}
              >
                <Tooltip
                  title="Sort"
                  // placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.title}
                    direction={order}
                    onClick={this.createSortHandler(column.title)}
                  >
                    {column.title}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected,dataLength, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} مورد انتخاب شده
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            تعداد کل: {dataLength}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);



class EnhancedTable extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      root: "",
      table: "",
      columns: [],
      data: [],
      col: [],
      row: [],
      columnComponents: [<TableCell>default</TableCell>],

      order: 'asc',
      orderBy: '_ip',
      // orderBy: 'calories',
      selected: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleRequestSort = (event, property) => {
    console.log('property: ',property)
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n._id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, _id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(_id);
    console.log(selected,selectedIndex,_id)
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    console.log("newSelected",newSelected)
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = _id => this.state.selected.indexOf(_id) !== -1;

 




// class SimpleTable extends React.Component {
 
 
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
        if (j !== -1) {rows[i][j].data = value;}
        rows[i]._id=d._id
        
      });
      col.map(c => {
        if (rows[i].findIndex(ri => ri.column === c.column) === -1)
          rows[i].push({ column: c.column, data: "-",_id:d._id });
      });
    });
    this.setState({ data: newProps.data, col, rows }, () => {
      console.log(this.state.rows)
      this.setColumns()
      const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

      this.setRows(data, order, orderBy, selected, rowsPerPage, page);
     
    });
  }
  setColumns() {
    var columnComponents = this.state.col.map(c => {
      return <TableCell>{c.title}</TableCell>;
    });
    this.setState({ columnComponents }, () => {});
  }
  
  setRows(data, order, orderBy, selected, rowsPerPage, page) {
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
console.log(" this.state.rows:", this.state.rows)
    var rowsComponets = this.state.rows.sort(getSorting(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
   .map(r => {
      var thisRow = r.map(cell => {

        return <TableCell>{cell.data}</TableCell>;
        // return <TableCell component="th" scope="row" padding="none">{cell.data}</TableCell>;
      });
      const isSelected = this.isSelected(r._id);
      console.log("r._id: ",r._id)

      return (<TableRow hover
      onClick={event => this.handleClick(event, r._id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      key={r._id} 
      // key={n.title}
      selected={isSelected}>
      <TableCell padding="checkbox">
      {console.log("isSelected",isSelected)}
      
              <Checkbox checked={isSelected} />
            </TableCell>
            {thisRow}
            <TableCell>
            <Button label="ویرایش"  click={this.editBtnClick.bind(this)} />

            </TableCell>
            </TableRow>);
    });
    {emptyRows > 0 && (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )}
    this.setState({ rowsComponets }, () => {});
    
  }
  editBtnClick(event){
    <Modal/>
    //open modal
  }
  render() {
    const { classes } =this.props;

    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);


    return (
      <Paper className={classes.root.paper} elevation={1}>
      <Linkfy>
      <EnhancedTableToolbar numSelected={selected.length} dataLength={data.length} />
      <div className={classes.tableWrapper}>

        <Typography variant="headline" component="h3">
        {/* جدول */}
        </Typography>
        <Table className={classes.table} aria-labelledby="tableTitle">
        <EnhancedTableHead
            col={this.state.col}

        columnComponents={this.state.columnComponents}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
           
          <TableBody> 
         
              {this.state.rowsComponets}
              </TableBody>
        </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </Linkfy>
        </Paper>
      
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);

