import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialState {
    //Better to use Map there, but this is toy realization so...
    alert: string
}

const initialState: InitialState = {
    alert: ''
}


const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setAlert(state, action: PayloadAction<string>) {
            state.alert = action.payload
        },
        clearAlert(state) {
            state.alert = ''
        }
    }
})


export const {setAlert, clearAlert} = uiSlice.actions
export default uiSlice.reducer