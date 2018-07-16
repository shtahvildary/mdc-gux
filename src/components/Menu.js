import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleListMenu extends React.Component {
  button = null;
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
    selectedIndex: 1,
      items:[],
    };
  }

componentWillMount(){
  console.log("props.items",this.props.items)
  if(!this.props.items)return;
  var items=[];
  this.props.items.map((i,index)=>{
    console.log('i:',i)
    items.push(<MenuItem 
      key={i}
      // disabled={index === 0}
      selected={index === this.state.selectedIndex}
      onClick={event => this.handleMenuItemClick(event,index, i._id)}
      >{i.name}</MenuItem>)
  })
  this.setState({items});
}

handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index,id) => {
    this.setState({ selectedIndex: index, anchorEl: null,selectedId:id });
    // var DOMname=this.props.id
    var json={}
    json[this.props.id]=id
    this.props.selectedId(json)
    console.log('json: ',json)
  };

  handleClose = () => {
    this.setState({ anchorEl: null });

  };

  render() {
    // const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div >
      {/* <div className={classes.root}> */}
      <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={this.props.name}
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.props.name}
              secondary={this.state.items[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu 
          id={this.props.menueId}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        
          {this.state.items}
        </Menu>
      </div>
    );
  }
}
// SimpleListMenu.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default SimpleListMenu;