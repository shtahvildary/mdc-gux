import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  state = {
    open: false,
    title:"",
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.close()
  };
  componentWillReceiveProps(newProps){
    console.log("HIIIII")
    // if(!newProps.components) return
    if (newProps.title == this.state.title) return;
    var {title,open,contentText,btnLbl}=newProps
    this.setState({title,open,contentText,btnLbl},()=>{
    })
    
  }
  render() {
    console.log("HIIIII render")

    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}>Open alert dialog</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.contentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={this.handleClose} color="primary" autoFocus>
              {this.state.btnLbl}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
