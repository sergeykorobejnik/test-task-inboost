import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";


interface Props extends Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onClose'>, Partial<Fields> {
    modalTitle: string
    onSave: (fields: Fields) => void
}
interface Errors extends Record<keyof Omit<Todo, 'id'>, boolean> {}


const TaskModal: FC<Props> = ({isOpen, onClose, onSave, title, description, modalTitle}) => {
    const [fields, setFields] = useState<Fields>({
        title: '',
        description: ''
    })

    const [errors, setErrors] = useState<Errors>({
        title: false,
        description: false
    })

    const validate = ():boolean => {
        console.log(fields)
        const validatedErrors = {...errors}
        //returns true on valid fields and false on invalid fields
        let validationResult: boolean = true

        //well we need to use this to avoid problem with key types
        const fieldKeys = Object.keys(fields) as Array<keyof Fields>

        fieldKeys.forEach(key => {
            validatedErrors[key] = fields[key] === ''
            if (fields[key] === '') {
                validationResult = false
            }
        })

        setErrors(validatedErrors)

        return validationResult
    }

    const updateField = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: keyof Fields): void => {
        setFields({
            ...fields,
            [field]: e.target.value
        })
    }

    const saveHandler = (): void => {
        if (validate()) {
            onSave(fields)
        }
        onClose()
    }

    useEffect(() => {
        if (isOpen && title && description) {
            setFields({
                title,
                description,
            })
        }
        //reset modal fields
        return () => {
            setFields({
                title: '',
                description: ''
            })
            setErrors({
                title: false,
                description: false
            })

        }
    }, [isOpen])
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl isInvalid={errors.title}>
                            <FormLabel>title</FormLabel>
                            <Input
                                type="text"
                                value={fields.title}
                                onChange={(e) => updateField(e, 'title')}
                                onBlur={() => validate()}
                            />
                            {
                                errors.title &&
                                <FormHelperText color="red.500">This field is required</FormHelperText>
                            }
                        </FormControl>
                        <FormControl isInvalid={errors.description}>
                            <FormLabel>description</FormLabel>
                            <Textarea
                                resize="vertical"
                                value={fields.description}
                                onChange={(e) => updateField(e, 'description')}
                                onBlur={() => validate()}
                            />
                            {
                                errors.description &&
                                <FormHelperText color="red.500">This field is required</FormHelperText>
                            }
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' onClick={saveHandler}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TaskModal;