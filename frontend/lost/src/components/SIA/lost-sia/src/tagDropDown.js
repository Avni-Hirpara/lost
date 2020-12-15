import React, {useState, Component} from 'react'
import Table from 'pipelineGlobalComponents/modals/Table'
import { Dropdown} from 'semantic-ui-react'

class TagDropDown extends Component{

  constructor(props){
    super(props)
    this.state = {
      dropdownOpen: false,
      availableTags: undefined
    };
  }

  componentWillMount(){
    this.updatePossibleTags()
  }
  componentDidUpdate(prevProps, prevState){
    
    if (prevProps.availableTags !== this.props.availableTags){
        this.updatePossibleTags()
    }
  }
  updatePossibleTags(){
    let availableTags = []
    if (this.props.availableTags.length > 0){
      availableTags = this.props.availableTags.map(e => {
            return {
                key: e.tag, value: e.tag, text: e.tag
            }
        })
    }
    this.setState({availableTags})
  }

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      availableTags: [{ text: value, value }, ...prevState.availableTags],
    }))
  }
  dropDown(){
    return (

       <Dropdown
                        search
                        selection
                        closeOnChange
                        icon="search"
                        options={this.state.availableTags}
                        placeholder='Enter tag'
                        fluid
                        additionLabel='Custom tag: '
                        allowAdditions
                        onAddItem={this.handleAddition}
                        value={this.props.imageTag}
                        onChange={(e, item) => this.props.selectTag(e, item.value)}

                    />
                    )
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
              key: 'Select Tag:',
              value: this.dropDown()

            }
        ]
      }
      /></div>
    );
  }
}

export default TagDropDown
