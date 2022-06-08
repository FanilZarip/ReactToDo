import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

let tasks = [{name: "makeReactToDo", priority: "high"}, {name: "sleep", priority: "low"}];

const priorityList = {
  high: "high",
  low: "low",
}

const inputPlaceholders = {
  high: "Добавить важных дел",
  low: "Добавить"
}

function ToDoPriority(props) {

  const [taskName, setTaskName] = useState("");
  const [taskItem, setTaskItem] = useState([]);

  useEffect(() => {
    console.log("useEffect test2", taskItem);
    tasks.push(taskItem);  
    console.log("useEffect test", tasks);

  }, [taskItem]);

  function handleChange(event) {
    setTaskName(event.target.value);
  }

  const priorityBlock = [];

  for (const priority in priorityList) {

    function inputSubmit (event) {
      event.preventDefault();
  
      const inputClassName = event.target.children[0].className; 
      const isCorrectInput = inputClassName.includes(priorityList[priority]);
  
      if (isCorrectInput) {
        setTaskItem({name: taskName, priority: priorityList[priority], done: false});
        console.log("submitArray", taskItem);
      }
    }

    priorityBlock.push(
      <section className='todo' key={priorityList[priority]}>
        <div className='container'>
          <div className='todo__wrapper'>
            <p className='todo__priority_Title todo__priority_Title_high'>
              {priorityList[priority]}
            </p>
            <ToDoForm
              placeholder = {inputPlaceholders[priority]}
              inputClass = {"todo__taskText_input " + priorityList[priority]}
              priority = {priorityList[priority]}
              inputSubmit = {inputSubmit}
              handleChange = {handleChange}
            />
            
            <Tasks
              ulClass = {priorityList[priority]+"__list_wrapper"}
              priority = {priorityList[priority]}
              tasks = {tasks}
            />
          </div>
        </div>
      </section>
    ) 
  }

  return(
    <section className='todo'>
    <div className='container'>
      {priorityBlock}
    </div>
  </section>
  )
  
}

function ToDoForm(props){


  return (
    <form onSubmit={props.inputSubmit} className="d-flex todo__form">
      <ToDoInput
        inputClass = {props.inputClass}
        inputType = "text"
        placeholder = {props.placeholder}
        inputChange = {props.handleChange}
        inputValue = {props.inputValue}
      />
      <Button buttonClass = "button input__button" buttonType = "submit">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="-0.5" x2="18.0096" y2="-0.5" transform="matrix(0.999988 -0.00481873 0.0748716 0.997193 1 10)" stroke="#998899"/>
        <line y1="-0.5" x2="18.0401" y2="-0.5" transform="matrix(-0.0192905 -0.999814 0.998699 0.0509976 10.5404 18.8444)" stroke="#998899"/>
        </svg>
      </Button>
    </form>
  )
}

function Tasks(props) {

  const taskList = props.tasks;

  const taskByPriority = taskList.filter(task => {
    if (task.priority === props.priority) {
      return task;
    }
  });

  function deleteTask() {

  }

  const taskListItem = taskByPriority.map((task) => 
    <li className = "todo__List d-flex" key = {task.name} >
      <label className='todoCheckBox'>
        <ToDoInput 
          inputClass = "chckbx"
          inputType = "checkbox"
        />
        <span>
        </span>
      </label>
      <ToDoInput 
        inputClass = "todo__task__name todo__task__name__unselectchckbx"
        inputType = "text"
        readOnly = {true}
        inputValue = {task.name}
      />
      <Button buttonClass = "button task__delete_button" onClick = {deleteTask} >
      </Button>
    </li>
  );

  return (
    <ul className = {props.ulClass} >
      {taskListItem}
    </ul>
  )
}

function ToDoInput(props) {

  return (
    <input className = {props.inputClass} type = {props.inputType} placeholder = {props.placeholder} readOnly = {props.readOnly} value = {props.inputValue} onChange = {props.inputChange} />
  )
}

function Button(props) {
  return (
    <button className = {props.buttonClass} data-task-id = {props.taskId} type = {props.buttonType} onClick = {props.addTask} >
      {props.children}
    </button>
  )
}



function App() {
  
  return (
      <ToDoPriority />
  );
}

export default App
