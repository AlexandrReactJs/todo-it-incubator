import React, { ChangeEvent, KeyboardEvent } from "react";
import styles from './Todolist.module.css'
import addIcon from '../../assets/icons/add.png'
import cancelIcon from '../../assets/icons/cancel.png'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: Function
    setFilter: Function
    addTask: Function
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: string
}




const Todolist = (props: PropsType) => {



    const [newTaskTitle, setNewTaskTitle] = React.useState<string>("")
    const [error, setError] = React.useState<boolean>(false)

    const addTaks = () => {
        if (newTaskTitle?.trim() === "") {
            setError(true)
        } else {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")

        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
        setError(false)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaks()
        }
    }

    const onAllClickHandler = () => props.setFilter("all")
    const onActiveClickHandler = () => props.setFilter("active")
    const onCompletedClickHandler = () => props.setFilter("completed")


    if(!props.tasks) {
        return(
            <div className={styles.Todolist}>
            <div className={styles.taskTitle}>
                <h3>{props.title}</h3>
            </div>

            <div className={styles.newTask}>
                <div className={styles.newTaskMaker}>
                    <input value={newTaskTitle}
                        onChange={onChangeHandler}
                        type="text"
                        onKeyDown={onKeyDownHandler}
                        className={error ? styles.error : styles.inputTitle}
                        placeholder="Enter title"
                    />
                    <img onClick={addTaks} src={addIcon} alt="add task" />
                </div>

                {
                    error && <div>
                        <p className={styles.errorMessage}>Title is require</p>
                    </div>
                }

            </div>
            <div className={styles.tasks}>
                <p>No TASK</p>
            </div>
            <div>
                <button className={props.filter === "all" ? styles.activeFilter : styles.filterButton} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? styles.activeFilter : styles.filterButton} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? styles.activeFilter : styles.filterButton} onClick={onCompletedClickHandler}>Completed</button>
            </div>



        </div>
        )
    }



    
    return (
        <div className={styles.Todolist}>
            <div className={styles.taskTitle}>
                <h3>{props.title}</h3>
            </div>

            <div className={styles.newTask}>
                <div className={styles.newTaskMaker}>
                    <input value={newTaskTitle}
                        onChange={onChangeHandler}
                        type="text"
                        onKeyDown={onKeyDownHandler}
                        className={error ? styles.error : styles.inputTitle}
                        placeholder="Enter title"
                    />
                    <img onClick={addTaks} src={addIcon} alt="add task" />
                </div>

                {
                    error && <div>
                        <p className={styles.errorMessage}>Title is require</p>
                    </div>
                }

            </div>
            <div className={styles.tasks}>
                <ul className={styles.tasksList}>
                    {
                        
                            props.tasks.map(el => {

                                const removeTaskHandler = () => {
                                    props.removeTask(el.id)
                                }

                                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(el.id, e.currentTarget.checked)
                                }

                                return <div className={el.isDone ? styles.isDone : ""}>
                                    <li className={styles.task} key={el.id}>
                                        <div className={styles.taskCheckbox}>
                                            <input type="checkbox" onChange={changeStatus} checked={el.isDone} />
                                        </div>
                                        <div className={styles.taskTitle}>
                                            <span>{el.title}</span>
                                        </div>
                                        <div className={styles.taskCancel}>
                                            <img onClick={removeTaskHandler} src={cancelIcon} alt="cancel task" />
                                        </div>
                                    </li>
                                </div>

                            }
                            )


                    }

                </ul>
            </div>
            <div>
                <button className={props.filter === "all" ? styles.activeFilter : styles.filterButton} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? styles.activeFilter : styles.filterButton} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? styles.activeFilter : styles.filterButton} onClick={onCompletedClickHandler}>Completed</button>
            </div>



        </div>
    )
}




export default Todolist;