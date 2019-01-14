import React, { Component } from 'react'
import Downshift from 'downshift';

class DownshiftThree extends Component {
      constructor(props) {
        super(props)
        this.books = [
          { name: 'Harry Potter' },
          { name: 'Net Moves' },
          { name: 'Half of a yellow sun' },
          { name: 'The Da Vinci Code' },
          { name: 'Born a crime' },
        ];

        this.state = {
          // currently selected dropdown item
          selectedBook: ''
        }

        this.onChange = this.onChange.bind(this)
      }

      onChange(selectedBook) {
        this.setState({ selectedBook: selectedBook.name })
      }

      render() {
        return (
          <Downshift onChange={this.onChange} selectedItem={this.state.selectedBook} itemToString={books => (books ? books.name : '')}>
          // pass the downshift props into a callback
            {({ isOpen, getToggleButtonProps, getItemProps, highlightedIndex, selectedItem: dsSelectedItem, getLabelProps }) => (
              <div>
                // add a label tag and pass our label text to the getLabelProps function
                <label style={{ marginTop: '1rem', display: 'block' }} {...getLabelProps()}>Select your favourite book</label> <br />
                // add a button for our dropdown and pass the selected book as its content if there's a selected item
                <button className="dropdown-button" {...getToggleButtonProps()}>
                  {this.state.selectedBook !== '' ? this.state.selectedBook : 'Select a book ...'}
                </button>
                <div style={{ position: 'relative' }}>
                  // if the input element is open, render the div else render nothing
                  {isOpen ? (
                    <div className="downshift-dropdown">
                      {
                        // map through all the books and render them
                        this.books.map((item, index) => (
                          <div
                            className="dropdown-item"
                            {...getItemProps({ key: index, index, item })}
                            style={{
                              backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: dsSelectedItem === item ? 'bold' : 'normal',
                            }}>
                            {item.name}
                          </div>
                        ))
                      }
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </Downshift>
        )
      }
    }
    export default DownshiftThree