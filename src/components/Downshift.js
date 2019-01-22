import React, { Component } from 'react'
import Downshift from 'downshift';

class DownshiftThree extends Component {
  // class DownshiftThree extends Component {
      constructor(props) {
        super(props)
        // this.books = [
        //   { name: 'Harry Potter' },
        //   { name: 'Net Moves' },
        //   { name: 'Half of a yellow sun' },
        //   { name: 'The Da Vinci Code' },
        //   { name: 'Born a crime' },
        // ];

        this.state = {
          // currently selected dropdown item
          // selectedBook: ''
          selectedIndex:0,
          items:[],
        }

        this.onChange = this.onChange.bind(this)
      }

      onChange(selectedIndex) {
        this.setState({ selectedIndex: selectedIndex })
        // this.setState({ selectedBook: selectedBook.name })
      }
componentWillMount(){
  if(!this.props.items) return;
  this.setState({items:this.props.items},()=>{
    console.log("items: ",this.state.items)

  });
  
}
      render() {
  var items=this.state.items;
        return (
          // <Downshift onChange={this.onChange} selectedItem={this.state.selectedIndex} itemToString={(items=this.state.items) => (items ? items.name : '') }>
          <Downshift onChange={selection => alert(`You selected ${selection.name}`)} selectedItem={this.state.selectedIndex} itemToString={item => (item ? item.name : '')}>
          // pass the downshift props into a callback
         
            // {({ getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem, }) => (
              // console.log("hi: ",this.state.items)
              <div>
              <label {...getLabelProps()}>Enter a fruit</label>
              <input {...getInputProps()} />
              <ul {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(item => !inputValue || item.value.includes(inputValue))
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
              
            )}
          </Downshift>
        )
      }
    }
    export default DownshiftThree