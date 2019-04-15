import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import validator from "validator"


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
 
  componentWillReceiveProps(newProps) {
    const { classes } = newProps;
    if (newProps.items===this.state.items) return;
    // var items = this.state.items
    var items = []
    var keys,details
    newProps.items.map(i => {
      
       keys=Object.keys(i.details)
       details=""
       keys.map(k=>{
         if(k!="_id"){
         if (typeof i.details[k] === 'string' && validator.isURL(i.details[k]) && !validator.isIP(i.details[k])) details+=k+": "+ "مشاهده";
        //  if (typeof i.details[k] === 'string' && validator.isURL(i.details[k]) && !validator.isIP(i.details[k])) details+= "<a href={normUrl(i.details[k] )}>مشاهده</a>";
else
        details+=k+": "+i.details[k]+"\r\n"}
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
    })
  }
  render() {
    const { classes } = this.props;
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
