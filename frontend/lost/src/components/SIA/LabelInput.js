import React, {Component} from 'react'
import {connect} from 'react-redux'
import { InputGroup,
    InputGroupAddon,
    Input,
    Button,
    UncontrolledPopover, 
    PopoverHeader, 
    PopoverBody
} from 'reactstrap'
import { Dropdown, Ref } from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
import actions from '../../actions'
import Autocomplete from 'react-autocomplete'
import * as transform from './utils/transform'
import * as annoStatus from './types/annoStatus'
import * as constraints from './utils/constraints'

const {siaShowLabelInput, siaShowSingleAnno, selectAnnotation,
siaKeyDown} = actions


class LabelInput extends Component{

    constructor(props){
        super(props)
        this.state = {
            top: 400,
            left: 100,
            label: undefined,
            visibility: 'hidden',
            possibleLabels: []
        }
        this.inputGroupRef = React.createRef()
        this.inputRef = React.createRef()
    }

    componentWillMount(){
        this.updatePossibleLabels()
        this.setPosition()
    }
    
    componentDidUpdate(prevProps){
        if (this.props.showLabelInput){
            console.log('ShowLabelInput')
            this.setPosition()
            if (this.inputRef.current){
                console.log('LabelInput', this.inputRef.current)
                this.inputRef.current.click()
            }
            // if (this.inputGroupRef.current){
            //     this.inputGroupRef.current.click()
            // }
        } 
        // }
        if (prevProps.canvasKeyDown !== this.props.canvasKeyDown){
            this.performKeyAction(this.props.canvasKeyDown)
        }
        if (prevProps.possibleLabels !== this.props.possibleLabels){
            this.updatePossibleLabels()
        }
    }
    /*************
     * EVENTS    *
    **************/
    onKeyDown(e: Event){
        e.stopPropagation()
        console.log('LabelInput KeyDown on Input field: ', e.key)
        this.performKeyAction(e.key)
        
    }

    // onClickDelete(e){
    //     console.log('Clicked on delete')
    //     this.props.siaShowLabelInput(false)
    //     this.props.siaShowSingleAnno(undefined)
    //     this.props.selectAnnotation(undefined)
    //     //Reset keyDown on delete
    //     this.props.siaKeyDown(undefined) 
    //     if (this.props.onDeleteClick){
    //         this.props.onDeleteClick(this.props.selectedAnno.id)
    //     }
    // }

    // onAutocompleteClick(e){
    //     console.log('Clicked on Autocomplete :-) ')
    // }

    // onCheckClick(e){
    //     //this.closeLabelInput()
    //     //Reset keyDown after leaving with a click instead of keyDown
    //     //this.props.siaKeyDown(undefined) 
    //     this.confirmLabel()
    // }

    // onLabelSelect(value, item){
    //     console.log('LabelInput selected item', item)
    //     this.setState({ value, label: {...item} })
    // }

    onChange(e, item ){
        console.log('LabelInput onChange', e, item)
        this.setState({ label: item })
        // this.confirmLabel()
    }

    // onDropDownSelect(item){
    //     console.log('LabelInput selected Dropdown entry', item)
    //     if (this.state.label !== item ){
    //         this.setState({ label: item})
    //     }
    // }

    // onKeyUp(e:Event){
    //     e.stopPropagation()
    // }

    /*************
     * LOGIC     *
     *************/
    updatePossibleLabels(){
        let possibleLabels = []
        if (this.props.possibleLabels.length > 0){
            possibleLabels = this.props.possibleLabels.map(e => {
                return {key: e.id, value: e.id, text: e.label}
            })
        }
        possibleLabels = [{key: -1, text:"no label", value:-1}, ...possibleLabels]
        this.setState({possibleLabels})

    }
    setPosition(){
        if (this.props.selectedAnno.id){
            const center = transform.getCenter(this.props.selectedAnno.data, this.props.selectedAnno.type)
            // const annoBox = transform.getBox(this.props.selectedAnno.anno, this.props.selectedAnno.type)
            const inputRect = this.inputGroupRef.current.getBoundingClientRect()
            const top = this.props.svg.top + center.y - 20
            const left = this.props.svg.left + center.x - inputRect.width /2.0
            if (this.state.top !== top || this.state.left !== left){  
                this.setState({
                    top,
                    left
                })
            }
        }
    }

    performKeyAction(key){
        switch(key){
            case 'Enter':
                if (this.props.showLabelInput) this.confirmLabel()
                break
            case 'Escape':
                // console.log('LabelInput Escape current label', this.state.label.id)
                this.closeLabelInput()
                break
            default:
                break
        }
    }

    confirmLabel(){
        //If not allowed to label -> return
        if (!constraints.allowedToLabel(
            this.props.allowedActions, this.props.selectedAnno)) return
        console.log('LabelInput confirmLabel label', this.state.label)
        if (this.state.label){
            if (this.state.label.value !== -1){
                this.props.selectAnnotation({
                    ...this.props.selectedAnno,
                    labelIds: [this.state.label.value],
                    status: this.props.selectedAnno.status !== annoStatus.NEW ? annoStatus.CHANGED : annoStatus.NEW
                })
            } else {
                this.props.selectAnnotation({
                    ...this.props.selectedAnno,
                    labelIds: [],
                    status: this.props.selectedAnno.status !== annoStatus.NEW ? annoStatus.CHANGED : annoStatus.NEW
                })
            }
        } else {
            this.props.selectAnnotation({
                ...this.props.selectedAnno,
                labelIds: [],
                status: this.props.selectedAnno.status !== annoStatus.NEW ? annoStatus.CHANGED : annoStatus.NEW
            })
        }
        this.closeLabelInput()
    }

    closeLabelInput(){
        this.props.svgRef.current.focus()
        this.props.siaShowLabelInput(false)
        this.props.siaShowSingleAnno(undefined)
    }

    /*************
     * RENDERING *
    **************/

    render(){
        if (!this.props.showLabelInput) return null
        // console.log('Render LabelInput with state', this.state, this.props.possibleLabels)
        return (
            <div ref={this.inputGroupRef} style={{position:'fixed', top:this.state.top, left:this.state.left}}>
                <Ref innerRef={this.inputRef}>
                    <Dropdown
                        multiple={false}
                        search
                        selection
                        closeOnChange
                        options={this.state.possibleLabels}
                        placeholder='Enter label'
                        tabIndex={0}
                        onKeyDown= {e => this.onKeyDown(e)}
                        defaultValue={[-1]}
                        onChange={(e, item) => this.onChange(e, item)}
                        // searchInput={<Dropdown.SearchInput />}
                    />
                </Ref>
                {/* <InputGroup >
                   
                    <Autocomplete
                        ref = {el => this.inputRef = el}
                        items={this.state.possibleLabels}
                        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.label}
                        renderItem={(item, highlighted) => {
                        if (highlighted){
                            this.onDropDownSelect(item)
                        }
                        return (
                        <div
                            key={item.id}
                            style={{ backgroundColor: highlighted ? 'orange' : 'transparent'}}
                            // onMouseOver={e => this.onDropDownSelect(e, item)}
                        >
                            {item.label}
                        </div>
                        )
                        }}
                        inputProps={{
                            className:"form-control", //Added bootstrap class for input styling -.-
                            onKeyDown: e => this.onKeyDown(e),
                        }} 
                        value={this.state.value}
                        onChange={e => this.onChange(e)}
                        onSelect={(value, item) => this.onLabelSelect(value, item)}
                    />
                    <InputGroupAddon addonType="append">
                        <Button id="LabelInputPopover"><FontAwesomeIcon icon={faQuestionCircle}/></Button>
                        <Button onClick={e => this.onCheckClick(e)}><FontAwesomeIcon icon={faCheck} />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <UncontrolledPopover placement="top" target="LabelInputPopover">
                    <PopoverHeader >
                        {!this.state.label ? 'No label': this.state.label.label}
                            
                            <Button close
                                // style={{float:'right'}} 
                                // onMouseOut={e => this.mouseOutDelete(e)} 
                                // onMouseOver={e => this.mouseOverDelete(e)}
                                onClick={e => this.onClickDelete(e)}
                                />
                    </PopoverHeader>
                    <PopoverBody>
                        {!this.state.label ? 'no label selected': this.state.label.description}
                        
                    </PopoverBody>
                </UncontrolledPopover> */}
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    return ({
        selectedAnno: state.sia.selectedAnno,
        showLabelInput: state.sia.showLabelInput,
        canvasKeyDown: state.sia.keyDown,
        possibleLabels: state.sia.possibleLabels,
        allowedActions: state.sia.config.actions
    })
}

export default connect(
    mapStateToProps, 
    {siaShowLabelInput, siaShowSingleAnno, selectAnnotation, siaKeyDown}
    ,null,
    {forwardRef:true})(LabelInput)