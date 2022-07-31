import {put, takeLatest} from 'redux-saga/effects'
import {api} from "../../api/api";
import {addTodo, deleteTodo, setLoadingStart, setLoadingStop, setTodoList, todoActionTypes} from "../slices/todoSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {setAlert} from "../slices/uiSlice";


function* getAllTodos () {
    try {
        const data: Array<Todo> = yield api.requests.getAllTasks()
        yield put(setLoadingStop())
        yield put(setTodoList(data))

    } catch (e) {
        yield put(setAlert('Error during getting todo list'))
    }
}

function * updateTodo (action: PayloadAction<Todo>) {
    console.log(action.payload)
    try {
        yield api.requests.updateTask(action.payload)
    } catch (e) {
        console.log(e)
        yield put(setLoadingStart())
        yield put(setAlert('Error during updating todo'))
    }
}

function* removeTodo (action: PayloadAction<Todo['id']>) {
    console.log(action.payload)
    try {
        yield api.requests.deleteTask(action.payload)
        yield put(setLoadingStart())
    } catch (e) {
        console.log(e)
        yield put(setLoadingStart())
        yield put(setAlert('Error during removing todo'))
    }
}

function* createTodo (action: PayloadAction<Omit<Todo, 'id'>>) {
    console.log(action.payload)
    try {
        yield api.requests.createTask(action.payload)
        yield put(setLoadingStart())
    } catch (e) {
        yield put(setAlert('Error during creation todo'))
    }
}



export function* watchLoadingTodos () {
    yield takeLatest(todoActionTypes.setLoadingStart, getAllTodos)
}

export function* watchEditingTodos () {
    yield takeLatest(todoActionTypes.editTodo, updateTodo)
}

export function* watchRemoveTodo () {
    yield takeLatest(deleteTodo.toString(), removeTodo)
}

export function* watchCreatingTodo () {
    yield takeLatest(addTodo.toString(), createTodo)
}