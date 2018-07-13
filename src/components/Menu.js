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

class SimpleMenu extends React.Component {
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
      disabled={index === 0}
      selected={index === this.state.selectedIndex}
      // id={i._id}
      onClick={event => this.handleMenuItemClick(event, i._id)}
      >{i.name}</MenuItem>)
  })
  this.setState({items});
}

handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
    // console.log('anchorEl: ',event.currentTarget)
    // this.props.
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    console.log(index)
  };

  handleClose = () => {
    this.setState({ anchorEl: null });

  };
  // handleChange=event=>{
  //   this.setState({ selectedItem: event.Target.id });
  //   console.log('selectedItem: ',this.state.selectedItem)

  // }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      // <div className={classes.root}>
      <div>
      <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="When device is locked"
              secondary={this.state.items[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id={this.props.menueId}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          // onChange={this.handleChange}
        >
        
          {this.state.items}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;