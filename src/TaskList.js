import React, { useEffect, useState } from 'react';
//the two hooks, used to handle side effects and manage state within this functional component.

function TaskList({ tasks, updateTaskTime, deleteTask }) {
  const [completedTasks, setCompletedTasks] = useState({});//completedTasks: a state object that keeps track of which tasks are completed.
  
  const [currentTaskId, setCurrentTaskId] = useState(null);//currentTaskId: holds the ID of the task currently requiring user input for completion.
//The useEffect hook sets up a repeating action using setInterval that runs every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => {
        if (task.timeLeft > 0) {
          updateTaskTime(task.id); //calls updateTaskTime to decrease the task's time.
        } else if (task.timeLeft === 0 && !completedTasks[task.id]) {//adds the task which is completed in the list of completedtasks
          setCurrentTaskId(task.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, updateTaskTime, completedTasks]);
//handling completion of a task
  const handleCompletion = (isCompleted) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [currentTaskId]: isCompleted ? 'Congrats, you made it!!' : 'Better luck next time!!',
    }));
    setCurrentTaskId(null);
  };
 // Formats the time left into days, hours, minutes, and seconds.
  const formatTimeLeft = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  const currentTask = tasks.find((task) => task.id === currentTaskId);//Finding the task with the id that matches currentTaskId 
//return renders the TaskList, it renders:
//A "Delete" button that calls deleteTask with the task’s ID.
//The task name.
  return (
    <div style={styles.list}>
      {tasks.map((task) => (
        <div key={task.id} style={styles.task}>
          <h3>{task.name}</h3>
          {task.timeLeft > 0 ? (
            <p style={styles.timeLeft}>Time Left: {formatTimeLeft(task.timeLeft)}</p>
          ) : (
            <p style={styles.completedText}>{completedTasks[task.id]}</p>
          )}
          <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      ))}
{/* it renders a modal that asks if the task was completed, with buttons for "Yes" or "No" to handle the response. */}
      {currentTask && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Hey</h3>
            <p>Did you complete the task "{currentTask.name}"?</p>
            <button onClick={() => handleCompletion(true)} style={styles.completeButton}>
              Yes
            </button>
            <button onClick={() => handleCompletion(false)} style={styles.incompleteButton}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  list: { display: 'flex', flexDirection: 'column', gap: '15px', color: '#00ff99' },
  task: {
    padding: '15px',
    backgroundColor: '#1a1a1d',
    borderRadius: '8px',
    boxShadow: '0 0 10px #00ff99',
    color: '#00ff99',
    position: 'relative',
    fontFamily: 'monospace',
  },
  timeLeft: { color: '#ff3366', fontFamily: 'digital' },
  completedText: { color: '#00ff99' },
  deleteButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    padding: '5px 10px',
    backgroundColor: '#1f1f1f',
    color: '#ff3366',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px #ff3366',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1d',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
    color: '#00ff99',
  },
  modalTitle: { color: '#ff3366' },
  completeButton: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px #00ff99',
  },
  incompleteButton: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px #ff3366',
  },
};

export default TaskList;

