import React from "react";
import ReactToPrint from "react-to-print";  ////https://www.npmjs.com/package/react-to-print
 
// class ComponentToPrint extends React.Component {
//   render() {
//     return (
//       <table>
//         <thead>
//           <th>column 1</th>
//           <th>column 2</th>
//           <th>column 3</th>
//         </thead>
//         <tbody>
//           <tr>
//             <td>data 1</td>
//             <td>data 2</td>
//             <td>data 3</td>
//           </tr>
//           <tr>
//             <td>data 1</td>
//             <td>data 2</td>
//             <td>data 3</td>
//           </tr>
//           <tr>
//             <td>data 1</td>
//             <td>data 2</td>
//             <td>data 3</td>
//           </tr>
//         </tbody>
//       </table>
//     );
//   }
// }
 
class print extends React.Component {
  state = {
    open: false,
    localComponent:"",
  };
  componentWillReceiveProps(newProps){
    console.log("HIIII PRINT")
    var localComponent=<newProps.ComponentToPrint ref={el => (this.componentRef = el)}/>
    this.setState(localComponent)

  }
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
       {this.state.localComponent}
      </div>
    );
  }
}
export default (print);
