import React, {FC, useState} from 'react';
import {Button, Flex, Input, Text, useDisclosure} from "@chakra-ui/react";
import {AddIcon, Search2Icon} from "@chakra-ui/icons";
import TaskModal from "../TaskModal/TaskModal";
import {useAppDispatch} from "../../redux";
import {addTodo, editTodo} from "../../redux/slices/todoSlice";
import {api} from "../../api/api";
import {setAlert} from "../../redux/slices/uiSlice";

type AllowedActions = typeof addTodo | typeof editTodo
type ModalProps = {
    modalTitle: string
    action: AllowedActions
} & Partial<Fields>

const BottomBar: FC = props => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [modalProps, setModalProps] = useState<ModalProps>({
        modalTitle: 'Edit todo',
        action: addTodo
    })
    const [id, setId] = useState('')
    const dispatch = useAppDispatch()

    const onSave = (action: AllowedActions) => (fields: Fields): void => {
        dispatch(addTodo(fields))
    }

    return (
        <Flex
            position="fixed"
            bottom={0}
            w="80%"
            padding={3}
            margin={5}
            borderRadius={30}
            background="red.400"
            justify="center"
            align="center"
            gap={10}
        >
            <Button
                bg="#fff"
                aria-label='Add new task'
                size='lg'
                onClick={() => {
                    setModalProps((prevState => ({
                        ...prevState,
                        modalTitle: 'Edit todo',
                        action: addTodo
                    })))
                    onOpen()
                }}
            >
                <AddIcon/>
                <Text ml={2}>Add new todo</Text>
            </Button>
            <Button
                bg="#fff"
                aria-label='get specific Todo'
                size='lg'
                as="div"
            >
                <Input
                    value={id}
                    placeholder="get specific task by id"
                    onChange={(e) => setId(e.target.value)}
                />
                <Search2Icon
                    ml={3}
                    onClick={async () => {
                        try {
                            const {title, description} = await api.requests.getSpecificTask(parseInt(id))
                            console.log(title, description)
                            setModalProps((prevState => ({
                                ...prevState,
                                modalTitle: 'Todo selected by id',
                                title,
                                description,
                                action: editTodo
                            })))
                            onOpen()
                        } catch (e) {
                            dispatch(setAlert('Error during getting specific todo'))
                        }

                    }}
                />
            </Button>
            <TaskModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={onSave(modalProps.action)}
                {...modalProps}
            />
        </Flex>
    );
};

export default BottomBar;