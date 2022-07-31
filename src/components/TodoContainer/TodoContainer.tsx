import React, {FC, useEffect} from 'react';
import {Grid} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux";
import TodoItem from "../TodoItem/TodoItem";
import {setLoadingStart} from "../../redux/slices/todoSlice";

const TodoContainer: FC = props => {
    const dispatch = useAppDispatch()
    const todoList = useAppSelector(({todo}) => todo.todoList)

    useEffect(() => {
        dispatch(setLoadingStart())
    }, [dispatch])

    return (
        <Grid
            w="80%"
            h="80%"
            gap={10}
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(4, 1fr)"
        >
            {
                todoList.map(todo =>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                    />)
            }
        </Grid>
    );
};

export default TodoContainer;