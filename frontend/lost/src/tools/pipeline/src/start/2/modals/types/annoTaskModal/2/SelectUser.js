import React, {Component} from 'react'
import actions from 'actions/pipeline/pipelineStartModals/annoTask'
import { connect } from 'react-redux';
const {selectUser} = actions
import {Card, CardBody} from 'reactstrap'

class SelectUser extends Component{
    constructor(){
        super()
        this.selectRow = this.selectRow.bind(this)
    }

    selectRow(e){
        this.props.selectUser(
            this.props.peN, 
            e.currentTarget.getAttribute('name'),
            e.currentTarget.getAttribute('id'))
        this.props.verifyTab(this.props.peN, 1, true)
        this.props.selectTab(this.props.peN, 2)
        
    }


    renderTable(){
        return this.props.availableGroups.map((el)=>{
            return(
                <div key={el.id} id={el.id} name={el.groupName} onClick={this.selectRow}>{el.groupName}</div>
            )
        })
    }
    render(){
        return(
            <Card className='annotask-modal-card'>
            <CardBody>
                {this.renderTable()}
                </CardBody>
                </Card>
        )
    }
}

export default connect(null, {selectUser})(SelectUser)