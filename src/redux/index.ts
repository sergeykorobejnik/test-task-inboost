import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import todoSlice from "./slices/todoSlice";
import uiSlice from "./slices/uiSlice";
import createSagaMiddleware from 'redux-saga';
import {watchCreatingTodo, watchEditingTodos, watchLoadingTodos, watchRemoveTodo} from "./saga/todoSaga";

const saga = createSagaMiddleware()

const store = configureStore({
    reducer: {
        todo: todoSlice,
        ui: uiSlice
    },
    middleware: [saga]
})

saga.run(watchLoadingTodos)
saga.run(watchEditingTodos)
saga.run(watchRemoveTodo)
saga.run(watchCreatingTodo)


export default store

export type AppDispatch = typeof store.dispatch

// export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector