import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class SimpleExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
  }
  componentWillMount(){
    const { classes } = this.props;
    console.log(this.props)
    if (!this.props.items) return;
    // var items = this.state.items
    var items =[];
    this.props.items.map(i => {
      console.log(i.details)
      items.push(
        <ExpansionPanel key={i.summary}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{i.summary}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {JSON.stringify(i.details)}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>)
    })
    this.setState({ items }, () => { console.log(items) })
  }

  componentWillReceiveProps(newProps) {
    const { classes } = newProps;
    // console.log(newProps)
    if (newProps.items===this.state.items) return;
    // var items = this.state.items
    var items = []
    var keys,details
    newProps.items.map(i => {
      // console.log(i.details)
      
       keys=Object.keys(i.details)
       details=""
       keys.map(k=>{
         if(k!="_id")         
        details+=k+": "+i.details[k]+"\r\n"
        // details+="\r\n"+k+": "+i.details[k]+"\r\n"
        // details+=k+": "+i.details[k]
      })
      items.push(
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{i.summary}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {details}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>)
    })
    this.setState({ items,dataLength:newProps.dataLength }, () => { 
      // console.log(items) 
    })
  }
  render() {
    const { classes } = this.props;
    // console.log("props: ", this.state.items)

    return (

      <div className="container">
      تعداد کل: {this.state.dataLength}
       {this.state.items}
      </div>
    );
  }
}
SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
