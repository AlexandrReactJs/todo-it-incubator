import React from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import { TasksType } from './components/Todolist/Todolist';
import { v1 } from 'uuid';






function App() {


  type filterValuesType = "all" | "active" | "completed"

  let tasks1 = [
    { id: v1(), title: 'React', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'CSS', isDone: false }

  ]

  const [tasks, setTasks] = React.useState<TasksType[]>(tasks1)
  const [filter, setFilter] = React.useState<filterValuesType>('all')




  const removeTask = (id: string) => {
    let result = tasks.filter(t => t.id !== id)
    setTasks(result)

  }

  const addTask = (title: string) => {
  
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)

  }

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find(t => t.id === taskId)
    if(task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  let tasksForTodoList = tasks
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  } else if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  } else {
    tasksForTodoList = tasks
  }

  return (
    <div className="App">
      <Todolist title="TODO"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        setFilter={setFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
      
      

    </div>
  );
}




export default App;
