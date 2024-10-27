import React, { useState, useEffect } from 'react';
//useState  manages state in function components
//useEffect allows you to perform side effects in function components like data fetching 
//importing the componenets made
import TaskForm from './TaskForm';
import TaskList from './TaskList';
//creation of a functional component named app
function App() {
  const [tasks, setTasks] = useState(() => { //initializes variable tasks with useState. 
    //The initial value is set using a function that checks for saved tasks in localStorage.
    const savedTasks = localStorage.getItem('tasks');//retrieves the tasks stored in localStorage 
    return savedTasks ? JSON.parse(savedTasks) : [];//If savedTasks exists ,it parses the JSON string back into an array of tasks
    //If it doesn't exist, it returns an empty array.
  });

  useEffect(() => { //useEffect hook will run whenever the tasks state changes.
    localStorage.setItem('tasks', JSON.stringify(tasks));//saves the current tasks state back to localStorage, converting it to a JSON string.
  }, [tasks]); //specifies that it should run whenever tasks changes.
 

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), timeLeft: task.duration, completed: null };
    setTasks((prevTasks) => [...prevTasks, newTask]);//updates the tasks state by adding the newTask to the previous tasks array.
  };
//used to update the time left for a specific task.
  const updateTaskTime = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {//It maps over each task in the current tasks array.
        if (task.id === id && task.timeLeft > 0) {//If the current task's id matches the passed id and timeLeft is greater than 0
          return { ...task, timeLeft: task.timeLeft - 1 };//...decrease the timeLeft by 1 and return the updated task.
        } else if (task.id === id && task.timeLeft === 0 && task.completed === null) {
          const isCompleted = window.confirm('Is this task completed?');//Prompt the user with a confirmation dialog asking if the task is completed.
          return {
            ...task,
            completed: isCompleted ? 'Congrats, you made it!!' : 'Better Luck next time!!',//Set the completed property based on the user's response from the confirmation dialog.
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1>T<sup>3</sup>
        <br></br>
        Task Time Track
        </h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} updateTaskTime={updateTaskTime} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
//styling through css
const styles = {
  background: {
    backgroundColor: '#ffcccb', // light pink background
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#000000', // black rectangle
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    color: '#00ff99',
  },
};
//With export default, other parts of your app 
//can access and use the TaskForm component by importing it into another file

export default App;
