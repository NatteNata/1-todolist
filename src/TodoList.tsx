import React from 'react';
import {FilterValuesType} from "./App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    // removeTask: Function
    removeTask: (id: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const TodoList = (props: TodoListPropsType) => {
    // debugger

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(task => <li key={task.id}><input type="checkbox"
                                                              checked={task.isDone}/><span>{task.title} </span>
                <button onClick={() => {
                    props.removeTask(task.id)
                }}>X
                </button>
            </li>)}
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter('all')
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter('active')
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter('completed')
            }}>Completed
            </button>
        </div>
    </div>
};