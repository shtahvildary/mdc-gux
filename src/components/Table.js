import React from 'react';
import mapKeys from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
let id = 0;
function createData(name, cable, swName, swPort, vlan,systemType,description) {
    id += 1;
    return { id, name, cable, swName, swPort, vlan,systemType,description };
  }
  const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0,34,'sfgh'),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3,56,'fghdfh'),
    createData('Eclair', 262, 16.0, 24, 6.0,47,'hgjfgh'),
    createData('Cupcake', 305, 3.7, 67, 4.3,989,'sfghdf'),
    createData('Gingerbread', 356, 16.0, 49, 3.9,546,'gfjhfg'),
  ];

class SimpleTable extends React.Component{
  

  constructor(props){
    console.log("props: ",props);
    super(props);
  this.state={
    root:'',
    table:'',
    columns:props.columns,
    data:props.data,
    col:[],
    row:[],
  }
//   var col=[];
//   var row=[]
//     this.state.data.map(d=>{
//       console.log("d: ",d)
//       mapKeys(d,(key,value)=>{
//         this.setState(col.push({column:key}))
//          this.setState(row.push({column:key,data:value}))

          
//       })
//   }
// );


  }
  render(){
   
    // console.log("col: ",col)
    var col=[];
    var row=[];
    console.log(this.state)

      this.state.data.map(d=>{
        console.log("d: ",d)
        mapKeys(d,(key,value)=>{
          col.push({column:key})
           row.push({column:key,data:value})        
        })
    }
  );
  this.setState({col,row})

    return(

    <Paper className={this.state.root}>
      <Table className={this.state.table}>
        <TableHead>
          <TableRow>
            {this.state.col.map(c=>{
              console.log("c: ",c)
              return(
            <TableCell>{c}</TableCell>

              )
            })}
              {/* bayad ba key ha por shavad */}
            {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell numeric>شماره کابل</TableCell>
            <TableCell numeric>نام سوییچ</TableCell>
            <TableCell numeric>شماره پورت</TableCell>
            <TableCell numeric>vlan</TableCell>
            <TableCell numeric>systemType</TableCell>
            <TableCell numeric>توضیحات</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">{n.name}</TableCell>
                  <TableCell numeric>{n.cable}</TableCell>
                  <TableCell numeric>{n.swName}</TableCell>
                  <TableCell numeric>{n.swPort}</TableCell>
                  <TableCell numeric>{n.vlan}</TableCell>
                  <TableCell numeric>{n.systemType}</TableCell>
                  <TableCell numeric>{n.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          
        </Table>
      </Paper>
      
          )
    
  }

}

// export default SimpleTable;
  // function SimpleTable(props) {
  
  //   const { classes } = props;
  //   console.log(props)
  //   props.data.map(d=>{
  //       mapKeys(d,(key,value)=>{
            
  //       })
  //   });
  //   return (
  //     <Paper className={classes.root}>
  //     <Table className={classes.table}>
  //       <TableHead>
  //         <TableRow>
  //             {/* bayad ba key ha por shavad */}
  //           <TableCell>Dessert (100g serving)</TableCell>
  //           <TableCell numeric>شماره کابل</TableCell>
  //           <TableCell numeric>نام سوییچ</TableCell>
  //           <TableCell numeric>شماره پورت</TableCell>
  //           <TableCell numeric>vlan</TableCell>
  //           <TableCell numeric>systemType</TableCell>
  //           <TableCell numeric>توضیحات</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
          
  //             {/* bayad ba value ha por shavad */}
  //           {data.map(n => {
  //             return (
  //               <TableRow key={n.id}>
  //                 <TableCell component="th" scope="row">{n.name}</TableCell>
  //                 <TableCell numeric>{n.cable}</TableCell>
  //                 <TableCell numeric>{n.swName}</TableCell>
  //                 <TableCell numeric>{n.swPort}</TableCell>
  //                 <TableCell numeric>{n.vlan}</TableCell>
  //                 <TableCell numeric>{n.systemType}</TableCell>
  //                 <TableCell numeric>{n.description}</TableCell>
  //               </TableRow>
  //             );
  //           })}
  //         </TableBody>
          
  //       </Table>
  //     </Paper>
      
  //   );
   
  // }
  
  SimpleTable.propTypes = {
    data: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(SimpleTable);
