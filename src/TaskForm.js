// useState hook lets you add state to your component, 
//which helps keep track of values that can change over time, like user input.
import React, { useState } from 'react';
//TaskForm function is a React component. 
//It takes a single addTask (like a function argument) that will be used to add a new task to a list outside this component.
function TaskForm({ addTask }) {
  const [name, setName] = useState(''); //sets an initial value: an empty string 
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);// setName : use to update the corresponding state

  const handleSubmit = (e) => { //called when the user submits the form.
    e.preventDefault(); //doubt
    if (!name || (!days && !hours && !minutes && !seconds)) return;
    //checks if the name field is empty or allinputs are 0. 
    //If true ,it stops the form from submitting.
    const totalDuration = //calculates the total duration in seconds.
      parseInt(days, 10) * 86400 + //parseInt() ensures each field is an integer:
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10);

    addTask({ name, duration: totalDuration });//calling addtask function with the following arguments
    //reseting the form fields after the task is added
    setName('');
    setDays(0);
    setHours(0);
    setMinutes(0); 
    setSeconds(0);
  };

  return ( 
    //when the form is submitted, the handleSubmit function will run
    <form onSubmit={handleSubmit} style={styles.form}> 
   
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)} //updates the name state when the user types.
        required
        style={styles.input}
      />
      {/* creates a grid for the 4 inputs */}
      <div style={styles.gridContainer}>   
        <input
          type="number"
          placeholder="Days"
          value={days || ""} //displays the days state or an empty string if days is 0.
          onChange={(e) => setDays(e.target.value)}
          min="0"
          style={styles.smallInput}
        />
        <input
          type="number"
          placeholder="Hours"
          value={hours || ""}
          onChange={(e) => setHours(e.target.value)}
          min="0"
          max="23"
          style={styles.smallInput}
        />
        <input
          type="number"
          placeholder="Mins"
          value={minutes || ""}
          onChange={(e) => setMinutes(e.target.value)}
          min="0"
          max="59"
          style={styles.smallInput}
        />
        <input
          type="number"
          placeholder="Secs"
          value={seconds || ""}
          onChange={(e) => setSeconds(e.target.value)}
          min="0"
          max="59"
          style={styles.smallInput}
        />
      </div>
      <button type="submit" style={styles.button}>Add Task</button>
    </form>
  );
}
//Added css styles 
const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', color: '#00ff99' },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '2px solid #000000',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', 
    gap: '10px',
  },
  smallInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '2px solid #000000',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#ff0000',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 0px 10px #ff0000',
  },
};

export default TaskForm; //With export default, other parts of your app 
//can access and use the TaskForm component by importing it into another file
