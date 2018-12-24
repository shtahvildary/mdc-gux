import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DisconnectIcon from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
// import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import _ from "lodash";
import validator from "validator"
import normUrl from "normalize-url"

import { Link, Route, Switch } from 'react-router-dom';




// import DeleteObjects from "../DeleteObjects"


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
    const {  order, orderBy, columnData } = this.props;

    return (
      <TableHead>
        <TableRow>
        
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
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
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

  const { dataLength, classes, addNew } = props;
  // const { numSelected, dataLength, classes, addNew } = props;
  if (addNew) {
    <Switch>
      <Route path={addNew.path} component={addNew.component} />
    </Switch>
  }
  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        {
            <Typography variant="title" id="tableTitle">
              تعداد کل: {dataLength}
            </Typography>
          }
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>

        {addNew ? (
          <Tooltip title="جدید">
            <IconButton aria-label="New" component={Link} to={addNew.link}>
              {/* // <IconButton aria-label="New" onClick={event => addNew()}> */}
              <AddIcon />
            </IconButton>
          </Tooltip>
        ) : ('')
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
      selectedIds: [],
      data: [
      ],
      columnData: [],

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
    // var Delete=newProps.delete
    var { orderBy } = this.state;
    if (!orderBy && columns[0]) orderBy = columns[0].id
    this.setState({ columnData: columns, data, orderBy, addNew })
    // this.setState({ columnData: columns, data, orderBy, addNew ,Delete}) 
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
      this.setState(state => ({ selectedIds: state.map(n => n._id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  // handleClick = (event, id, _id) => {
  //   // handleClick = (event, id) => {
  //   const { selected, selectedIds } = this.state;
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];
  //   let newSelectedIds = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //     newSelectedIds = newSelectedIds.concat(selectedIds, _id)
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //     newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //     newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //     newSelectedIds = newSelectedIds.concat(
  //       selectedIds.slice(0, selectedIndex),
  //       selectedIds.slice(selectedIndex + 1),
  //     );
  //   }
  //   this.setState({ selected: newSelected }, () => { });
  //   this.setState({ selectedIds: newSelectedIds }, () => { })
  // };

 
  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, columnData, addNew } = this.state;

    return (
      <Paper  className={classes.root}>
        <EnhancedTableToolbar addNew={addNew} numSelected={selected.length} dataLength={data.length} />
        <div className={classes.tableWrapper}>
          <Table style={{ width: "auto", tableLayout: "auto" }} className={classes.table} aria-labelledby="tableTitle">
          {/* <Table style={{ width: "auto", tableLayout: "auto" }} className={classes.table} aria-labelledby="tableTitle"> */}
            <EnhancedTableHead

              columnData={columnData}
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              // rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .map(n => {
                  // const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      // aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      // selected={isSelected}
                    >
                      {columnData.map(c => {
                        let txt = n[c.id];
                        if (!txt) txt = "-";
                        if (typeof txt === 'string' && validator.isURL(txt) && !validator.isIP(txt)) txt = <a href={normUrl(txt)}>مشاهده</a>;
                        return <TableCell>{txt}</TableCell>
                      })}
                      <TableCell >
                        <Tooltip title="جزئیات">
                          <IconButton aria-label="View" onClick={event => this.props.showView(n)} >
                            <ViewListIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="ویرایش">
                          <IconButton aria-label="Edit" onClick={event => this.props.showEdit(n)} >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {(this.props.disconnect)?(
                           <Tooltip title="قطع">
                        <IconButton aria-label="Disconnect" onClick={event => this.props.disconnect({ _id: n._id })} >
                          <DisconnectIcon />
                        </IconButton>
                        </Tooltip>):("")}
                        <Tooltip title="پاک">
                        <IconButton aria-label="Delete" onClick={event => this.props.delete({ _id: n._id })} >
                          <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
       
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);