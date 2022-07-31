import React, {FC, useState} from 'react';
import {Editable, EditableInput, EditablePreview, EditableTextarea, Flex, IconButton} from "@chakra-ui/react";
import {useAppDispatch} from "../../redux";
import {deleteTodo, editTodo} from "../../redux/slices/todoSlice";
import {CloseIcon} from "@chakra-ui/icons";


interface Props  {
    todo: Todo
}

const TodoItem: FC<Props> = ({todo}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)

    const handleFieldSubmitting = ():void => {
        dispatch(editTodo({...todo, title, description}))
    }

    return (
        <Flex
            direction="column"
            bg={'gray.200'}
            w="100%"
            borderRadius="10"
            padding="15"
            position="relative"
            role="group"
        >
            <Editable
                fontSize="lg"
                defaultValue={title}
                onSubmit={handleFieldSubmitting}>
                <EditablePreview
                    fontWeight="500"
                    textAlign="center"
                    noOfLines={1}
                />
                <EditableInput
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Editable>
            <Editable
                defaultValue={description}
                onSubmit={handleFieldSubmitting}
            >
                <EditablePreview
                    whiteSpace="normal"
                    w="100%"
                    textAlign="center"
                    fontSize="md"
                />
                <EditableTextarea
                    whiteSpace="normal"
                    w="100%"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Editable>
            <IconButton
                top="-15"
                right="-15"
                borderRadius="50%"
                aria-label="Delete Todo"
                pos="absolute"
                size="md"
                colorScheme="red"
                opacity="0"
                _groupHover={{opacity: 1}}
                icon={<CloseIcon />}
                onClick={() => dispatch(deleteTodo(todo.id))}
            />
        </Flex>
    );
};

export default TodoItem;