import axios from "axios";

interface TaskResponse {
    tasks: Array<Todo>
}

interface Api  {
    path: {
        root: string
        task: string
        tasks: string
        updateTask: string
        createTask: string
        deleteTask: string
    },
    requests: {
        getAllTasks(): Promise<Array<Todo>>
        getSpecificTask(id: Todo['id']): Promise<Todo>
        updateTask(payload: Todo): Promise<void>
        createTask(payload: Omit<Todo, 'id'>): Promise<void>
        deleteTask(id: Todo['id']): Promise<void>
    },
    buildQuery (query: Array<keyof Api['path']>, id?: number): string

}

export const api: Api = {
    path: {
        root: 'http://localhost:9001',
        task: '/task',
        tasks: '/tasks',
        updateTask: '/task/update',
        createTask: '/task/create',
        deleteTask: '/task/delete',
    },
    requests: {
        async getAllTasks () {
            return await axios.get<TaskResponse>(api.buildQuery(['tasks'])).then(res => res.data.tasks)
        },
        async getSpecificTask (id) {
            return await axios
                .get<{task: Todo}>(api.buildQuery(['task'], id))
                .then(res => res.data.task)
        },
        async updateTask (payload) {
            await axios.post(api.buildQuery(['updateTask']), payload)
        },
        async createTask (payload) {
            await axios.post(api.buildQuery(['createTask']), payload)
        },
        async deleteTask (id) {
            await axios.delete(api.buildQuery(['deleteTask'], id))
        }
    },
    buildQuery (query, id) {
        console.log(this.path.root + `${query.map(key => this.path[key]).join('/')}${id ? '/' + id : ''}`)
        return this.path.root + `${query.map(key => this.path[key]).join('/')}${id ? '/' + id : ''}`
    }
}