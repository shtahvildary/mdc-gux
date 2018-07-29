import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: 0,
    items:[],
    radioList:[],
  };

  handleChange = event => {
    this.setState({ value: event.target.value },()=>{
        this.props.selectedValue(this.state.value)
    });
    console.log(this.state.value)
  };
  componentWillMount(){
    const { classes } = this.props;
    var items=this.props.items;
    // var radioList=[]

    this.setState({items})
    this.setlocalComponent(items,classes)
    // items.map(i=>{
    //     radioList.push(
    //         <FormControlLabel value={i.value} control={<Radio />} label={i.label}  />
    //     )
    // })
    // var localComponent=[]
    // localComponent.push(
    //     <RadioGroup
    //     aria-label="floor"
    //     name="floor"
    //     className={classes.group}
    //     value={this.state.value}
    //     onChange={this.handleChange}
    //     >
    //     {radioList}

    //       </RadioGroup>
      

    // )
    // this.setState({localComponent},()=>{
    //     console.log(this.state.localComponent)
    // })
      
  }
  setlocalComponent(items,classes){
    var radioList=[]

    items.map(i=>{
        radioList.push(
            <FormControlLabel value={i.value} control={<Radio />} label={i.label}  />
        )
    })
    var localComponent=[]
    localComponent.push(
        <RadioGroup
        aria-label="floor"
        name="floor"
        className={classes.group}
        value={this.state.value}
        onChange={this.handleChange}
        >
        {radioList}

          </RadioGroup>
      

    )
    this.setState({localComponent},()=>{
        console.log(this.state.localComponent)
    })
  }
//   componentWillReceiveProps(newProps){
//     console.log(newProps)

//     if (newProps.items == this.state.items) return;
//     var items=newProps.items;
//     var radioList=[]
//     items.map(i=>{
//         radioList.push(
//             <FormControlLabel value={i.value} control={<Radio />} label={i.label} />
//         )
//     })
//     this.setState(radioList,()=>{
//         console.log(this.state.radioList)
//     })

//   }

  render() {
    const { classes } = this.props;
    // this.setlocalComponent(this.state.items,classes)

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" required className={classes.formControl}>
        {this.state.localComponent}
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          {/* {console.log("this.state.value: ",this.state.value)} */}
          {/* <RadioGroup
            aria-label="floor"
            name="floor"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          > */}
         {/* {console.log(this.state.items)}
         { 
             this.state.items.map(i=>{
            <FormControlLabel value={i.value} control={<Radio />} label={i.label} />

         })} */}
          {/* {this.state.radioList} */}
            {/* <FormControlLabel value="floor" control={<Radio />} label="طبقه" />
            <FormControlLabel value="halfFloor" control={<Radio />} label="نیم طبقه" /> */}
            {/* <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="(Disabled option)"
            /> */}
          {/* </RadioGroup> */}
          {/* <FormHelperText>You can display an error</FormHelperText> */}

        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
