import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import "../App.css";



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
    selectedIndex: 0,
      items:[],
    };
  }

componentWillMount(){
  if(!this.props.items)return;
  var items=[];
  // console.log("this.props.defaultValue: ",this.props.defaultValue)
  items[0]=
  <MenuItem 
      disabled
     >انتخاب کنید...</MenuItem>
  this.props.items.map((i,index)=>{
    if (i._id==this.props.defaultValue) this.setState({selectedIndex:index+1})
    items.push(<MenuItem 
      key={i}
      // disabled={index === 0}
      // selected={(index+1 === this.state.selectedIndex)||(i.name===this.props.defaultValue)}
      selected={(index+1 === this.state.selectedIndex)||(i._id===this.props.defaultValue)}
      onClick={event => this.handleMenuItemClick(event,index+1, i._id)}
      >{i.name}</MenuItem>)
    })
    if(!this.props.noNullItem)
    items.push(<MenuItem selected={(this.props.items.length+1)}
    onClick={event => this.handleMenuItemClick(event,this.props.items.length+1, null)}>هیچکدام</MenuItem>)
  
  this.setState({items});
}

handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index,id) => {
    this.setState({ selectedIndex: index, anchorEl: null,selectedId:id });
    // var DOMname=this.props.id


    // var json={}
    // json[this.props.id]=id
    // this.props.selectedId(json)

      var json={}
    json[this.props.id]=id
    this.props.selectedId(json)
  };

  handleClose = () => {
    this.setState({ anchorEl: null });

  };

  render() {
    // const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
        <Grid container  justify= 'center'>
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
        </Grid>
    );
  }
}
// SimpleListMenu.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
// export default SimpleListMenu;
export default withStyles(styles)(SimpleListMenu);
