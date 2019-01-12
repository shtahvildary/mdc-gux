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
    var items = this.state.items
    var items = this.props.items
    this.props.items.map(i => {
      console.log(i.details)
      items.push(
        <ExpansionPanel>
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
    console.log(this.newProps)
    if (!newProps.items) return;
    var items = this.state.items
    // var items = this.newProps.items
    newProps.items.map(i => {
      console.log(i.details)
      items.push(
        <ExpansionPanel>
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
  render() {
    const { classes } = this.props;
    console.log("props: ", this.state.items)

    return (

      <div className="container">
       {this.state.items}
      </div>
    );
  }
}
SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
