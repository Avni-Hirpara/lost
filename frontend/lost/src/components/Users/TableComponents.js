import React, { useEffect, useState } from 'react'
import { Icon, Button, Input, Label, Form } from 'semantic-ui-react'
import * as Alert from '../BasicComponents/Alert'
import actions from 'actions/group'
import { useDispatch, useSelector } from 'react-redux';




export function timesIcon(callback) {
    if(callback){
        return (
        <Button  onClick={() => {callback("edit_isDesigner") }} icon>
        <Icon size='big' name='times circle outline' color="red"  />
      </Button>
      )
    
    }
    return <Icon size='big' name='times circle outline' color="red"  />
}

export function checkIcon(callback) {
    if(callback){
        return (
            <Button  onClick={() => {callback("edit_isDesigner") }} icon>
            <Icon size='big' name='check circle outline' color="green" />
          </Button>
          )
    }
    return <Icon size='big' name='check circle outline' color="green"  />
}

export function editButton(onClick, row) {
    return (
        <Button basic color='blue' onClick={() => { onClick("edit", row) }}>
            Edit
      </Button>
    )
}

export function deleteButton(onClick, row) {
    return (
        <Button basic color='red' onClick={async () => {
            const reallyDelete = await Alert.alertDelete()
            if (reallyDelete.value) {
                onClick("delete", row)
            }
        }

        }>
            Delete
      </Button>
    )
}

export function GroupLabelsEditable({ row, callback }) {
    const dispatch = useDispatch();
    const groups = useSelector((state) => {
        return state.group.groups
    });
    const [colorGroups, setColorGroups] = useState(
        groups.map(el => ({ 'selected': false, 'name': el.name }))
    )
    const getGroups = () => dispatch(actions.getGroupsAction());
    useEffect(() => {
        function fetchGroups() {
            getGroups();
        }
        fetchGroups();

    }, [])

    useEffect(() => {
        setColorGroups(
            groups.map(el => ({ 'selected': row.edit_groups.filter(el2 => el2.name === el.name).length ? true : false, 'name': el.name }))
        )
    }, [row])

    
    return (
        <>
            <div>
                {colorGroups.map(el => (
                    <Label style={{ margin: 3, cursor: 'pointer' }} color={el.selected ? 'green' : 'grey'} onClick={(e) => {
                        callback("edit_groups", colorGroups.filter(colorGroup=>{
                            if (colorGroup.name === e.currentTarget.innerHTML) {
                                return !colorGroup.selected 
                            }
                            return colorGroup.selected
                        }))
                    }} >
                        {el.name}
                    </Label>
                ))}
            </div>

        </>
    )
}

export function GroupLabels({ row }) {
    return (
        <>
            {row.groups.map(group =>
                <Label color='green' style={{ margin: 3 }}>
                    {group.name}
                </Label>
            )}
        </>
    )
}


function textInputInner(key, value, callback) {



    if (!value) value = {}
    return (
        <Form.Input
            style={{ width: 130 }}
            disabled={value.disabled}
            value={value.value}
            error={value.error}
            type={(key === "edit_password" || key === "edit_confirm_password") ? "password" : "text"}
            fluid
            onChange={(e) => {
                callback(
                    key,
                    e.currentTarget.value,
                )
            }
            }
        />
    )
}
export function textInput(key, value, callback) {
    return (
        <Form>
            {textInputInner(key, value, callback)}
        </Form>
    )
}

{/* <Input error value={value} style={{ width: 130 }} placeholder='Search...' onChange={(e) => { callback(key, e.currentTarget.value) }} /> */ }
