import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "../App.css";


const styles = {
  card: {
    maxWidth:'90%',
    // position:'center',
    minWidth: "auto",
    // minWidth: 275,
    margin:50,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SimpleCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      // content:""

    }
  }
  // componentWillMount(){
  //   console.log('card content: ',this.props.content)
  // if(!this.props.content)return;
  // this.setState({content:this.props.content},()=>{
    
  // })


  // }
  render(){
    const { classes } =this.props;
    // const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className="container" >
      <Card className={classes.card} xs={this.props.xs}>
        <CardContent>
          {/* <Typography className={classes.title} color="textSecondary">
          </Typography> */}
          <Typography variant="headline" component="h2">
            {this.props.pageName}
            {/* be{bull}nev{bull}o{bull}lent */}
          </Typography>
          {/* <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography> */}
          {/* <Typography component="p"> */}
            
            {this.props.content}
          {/* </Typography> */}
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
