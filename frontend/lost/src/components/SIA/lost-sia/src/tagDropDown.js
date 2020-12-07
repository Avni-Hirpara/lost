import React, {useState, Component} from 'react'
import Table from 'pipelineGlobalComponents/modals/Table'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class TagDropDown extends Component{

  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle(el) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  dropDown(){
    const options = ['low', 'medium', 'high']

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
            
          {this.props.imageTag?this.props.imageTag:'Select Item...'}
        </DropdownToggle>
        <DropdownMenu>
          {options.map((el)=>{
            return(
              <DropdownItem onClick={this.props.selectTag} key={el}> {el}</DropdownItem>
            )
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    return (
        <div
          style={{position: 'fixed', width: 50}}
        >
      <Table
        data= {
          [
            {
              key: 'Select Image Quality',
              value: this.dropDown()

            }
        ]
      }
      /></div>
    );
  }
}

export default TagDropDown
