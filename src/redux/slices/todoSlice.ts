import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getActionTypes} from "../../utils/getActionTypes";

interface InitialState {
    //Better to use Map there, but this is toy realization so...
    todoList: Array<Todo>,
    isLoading: boolean
}

const initialState: InitialState = {
    isLoading: false,
    todoList: []
}

export const addTodo = createAction<Omit<Todo, 'id'>>('todo/addTodo')
export const deleteTodo = createAction<Todo['id']>('todo/deleteTodo')

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setLoadingStart (state) {
            state.isLoading = true
        },
        setLoadingStop (state) {
            state.isLoading = false
        },
        setTodoList (state, action: PayloadAction<Array<Todo>>) {
            state.todoList = action.payload
        },
        editTodo(state, {payload}: PayloadAction<Todo>) {
            state.todoList = state.todoList.map(todo => todo.id === payload.id ? payload : todo)
        }
    },
})


export const {setLoadingStart, setLoadingStop, setTodoList, editTodo} = todoSlice.actions
export const todoActionTypes = getActionTypes(todoSlice.actions, todoSlice.name)
export default todoSlice.reducer