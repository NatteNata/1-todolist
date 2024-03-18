import {FilterValuesType, TodoListType} from '../App'
import {v1} from 'uuid'

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionTypes = RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType

export const todosistsReducer = (state: TodoListType[], action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(list => list.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const toDoList = state.find(todoList => todoList.id === action.id)

            if (toDoList) {
                toDoList.title = action.title
            }

            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const toDoList = state.find(todoList => todoList.id === action.id)

            if (toDoList) {
                toDoList.filter = action.filter
            }

            return [...state]
        }
        default:
            throw new Error('Error!')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTotodlistActionType => {
    return {type: 'ADD-TODOLIST', title}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTotodlistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTotodlistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}