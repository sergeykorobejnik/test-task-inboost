import {Slice} from "@reduxjs/toolkit";


type GetActionTypes = <T extends Slice['actions']>(actions: T, name: string) => Record<keyof T, string>

// utility function providing object with action type fields generated with createSlice
const getActionTypes: GetActionTypes = (actions, name) => {
    return Object.keys(actions).reduce((a, v) => {
        return {
            ...a, [v]: name + '/' + v
        }
    }, {} as Record<keyof typeof actions, string>)
}
export {getActionTypes}
