import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import FilterListIcon from '@material-ui/icons/FilterList';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import _ from "lodash";
import validator from "validator"
import normUrl from "normalize-url"

import { Link, Route, Switch } from 'react-router-dom';
import Print from './print'




import DeleteObjects from "../DeleteObjects"


function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}


class EnhancedTableHead extends React.Component {
  
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, columnData,tableBody } = this.props;

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
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
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
  // let handlePrint=props=>{


  const { numSelected, dataLength, classes, addNew,tableBody } = props;
 
  
  if(addNew){
    <Switch>
    <Route path={addNew.path} component={addNew.component} /> 
    </Switch> 
  }
  
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
      <Tooltip title="Print">
            <IconButton aria-label="Print" onClick={event=>this.handlePrint()}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (addNew?(
            <Tooltip title="New">
           
               <IconButton aria-label="New" component={Link} to={addNew.link}>
              {/* // <IconButton aria-label="New" onClick={event => addNew()}> */}
                <AddIcon />
              </IconButton>
            </Tooltip>
          ):('')
          )
          // : (
          //     <Tooltip title="Filter list">
          //       <IconButton aria-label="Filter list">
          //         <FilterListIcon />
          //       </IconButton>
          //     </Tooltip>
          //   )
        }
      </div>
    </Toolbar>
  );

};


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: null,
      selected: [],
      data: [
      ],
      columnData: [],
      page: 0,
      rowsPerPage: 5,
      print:"",
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.data === this.state.data) return;

    var columns = [];
    _.mapKeys(newProps.columns, (v, k) => {
      columns.push({ id: k, label: v })
    })
    var data = newProps.data.map((d, i) => {
      d.id = i;
      return d;
    })
    var addNew = newProps.addNew
    var { orderBy } = this.state;
    if (!orderBy && columns[0]) orderBy = columns[0].id
    this.setState({ columnData: columns, data, orderBy, addNew }) 
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
 
  handlePrint(){
    // var component=<Enhance/dTable/>
    console.log("print")
    {this.setState({print:<Print ComponentToPrint={this.state.tableBody}/>})}
  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;
 setTableBody(rowsPerPage,order,data,orderBy,page,columnData,emptyRows){
  var tableBody=[]
  tableBody.push( <TableBody>
    {data
      .sort(getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(n => {
        const isSelected = this.isSelected(n.id);
        return (
          <TableRow
            hover
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            key={n.id}
            selected={isSelected}
          >
            <TableCell padding="checkbox"
              onClick={event => this.handleClick(event, n.id)}
            >
              <Checkbox checked={isSelected} />
            </TableCell>
            {columnData.map(c => {
              let txt = n[c.id];
              if (!txt) txt = "-";
              if (validator.isURL(txt) && !validator.isIP(txt)) txt = <a href={normUrl(txt)}>مشاهده</a>;
              return <TableCell>{txt}</TableCell>
            })}
            <TableCell >
              <IconButton aria-label="Edit" onClick={event => this.props.showEdit(n)} >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="View" onClick={event => this.props.showView(n)} >
                <ViewListIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    {emptyRows > 0 && (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )}
  </TableBody>)
  
  
  this.setState(tableBody)
  
 }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, columnData, addNew } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar addNew={addNew} numSelected={selected.length} dataLength={data.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
            tableBody={this.state.tableBody}

              columnData={columnData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}

            />
            {this.state.tableBody}
            {/* {this.setTableBody(rowsPerPage,order,data,orderBy,page,columnData,emptyRows)} */}
            {/* <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox"
                        onClick={event => this.handleClick(event, n.id)}
                      >
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {columnData.map(c => {
                        let txt = n[c.id];
                        if (!txt) txt = "-";
                        if (validator.isURL(txt) && !validator.isIP(txt)) txt = <a href={normUrl(txt)}>مشاهده</a>;
                        return <TableCell>{txt}</TableCell>
                      })}
                      <TableCell >
                        <IconButton aria-label="Edit" onClick={event => this.props.showEdit(n)} >
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="View" onClick={event => this.props.showView(n)} >
                          <ViewListIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> */}
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
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);