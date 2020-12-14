import React, {useState, Component} from 'react'
import Table from 'pipelineGlobalComponents/modals/Table'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Dropdown} from 'semantic-ui-react'

class TagDropDown extends Component{

  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  componentWillMount(){
    this.updatePossibleTags()
  }
  toggle(el) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  updatePossibleTags(){
    let possibleTags = []
    // const defaultLabel = this.props.defaultLabel ? this.props.defaultLabel : 'no label'
    if (this.props.possibleTags.length > 0){
      possibleTags = this.props.possibleTags.map(e => {
            return {
                key: e.id, value: e.id, text: e.label,
                content: (<div onClick={(event) => this.onItemClick(event, e.id)}>
                    {e.label}</div>)
            }
        })
    }
    this.setState({possibleLabels})

  }
  dropDown(){
    const options = [{'text':'low', 'value': '1'},{'text':'medium', 'value': '2'}, {'text':'high', 'value':3}]

    return (
        <Dropdown
                        multiple={true}
                        search
                        selection
                        closeOnChange
                        icon="search"
                        options={options}
                        placeholder='Enter tag'
                        tabIndex={0}
                        value={this.props.imageTag}
                        onChange={(e, item) => this.props.selectTag(e, item)}
                        
                    />
    //   <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
    //     <DropdownToggle caret>
            
    //       {this.props.imageTag?this.props.imageTag:'Select Item...'}
    //     </DropdownToggle>
    //     <DropdownMenu>
    //       {options.map((el)=>{
    //         return(
    //           <DropdownItem onClick={this.props.selectTag} key={el}> {el}</DropdownItem>
    //         )
    //       })}
    //     </DropdownMenu>
    //   </Dropdown>
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
              key: 'Select Tags',
              value: this.dropDown()

            }
        ]
      }
      /></div>
    );
  }
}

export default TagDropDown
