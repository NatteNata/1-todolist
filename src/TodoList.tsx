import React, {ChangeEvent} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeToListTitle: (id: string, newTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)

    const onActiveClickHandler = () => props.changeFilter('active', props.id)

    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeToDoListTitle = (newTitle: string) => {
        props.changeToListTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/>
            <button onClick={removeTodolist}>Delete to-do list</button>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {props.tasks.map(task => {

                const onRemoveHandler = () => {
                    props.removeTask(task.id, props.id)
                }

                const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
                }

                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(task.id, newValue, props.id)
                }


                return <li key={task.id} className={task.isDone ? 'is-done' : ''}><input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeStatusHandler}/>
                    <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                    <button onClick={onRemoveHandler}>X</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}