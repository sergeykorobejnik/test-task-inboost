interface Todo {
    id: number,
    title: string,
    description: string
}

type Fields =  Omit<Todo, 'id'>