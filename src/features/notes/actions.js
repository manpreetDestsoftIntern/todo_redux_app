
// Function to save tasks to localStorage
const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state.tasks);
      localStorage.setItem("tasks", serializedState);
    } catch (error) {
      console.error("Error saving state:", error);
    }
};

const generateUniqueId = () => {
    return (
        Date.now().toString(36) + // Convert timestamp to base-36 string
        Math.random().toString(36).substring(2, 10) // Generate random string
    );
}


function convertMillisToTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 milliseconds
  const remainingMillisAfterHours = milliseconds % 3600000;
  const minutes = Math.floor(remainingMillisAfterHours / 60000); // 1 minute = 60000 milliseconds
  const remainingMillisAfterMinutes = remainingMillisAfterHours % 60000;
  const seconds = Math.floor(remainingMillisAfterMinutes / 1000); // 1 second = 1000 milliseconds

  // Return the result in 'hours:minutes:seconds' format
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}


export const AddNotes = (state, action) => {
    const id = generateUniqueId();
    state.tasks.push({ id, text: action.payload, completed: false, timeElapsed: 0, isRunning: false });
    saveState(state); // Save updated state to localStorage
}
export const RemoveNotes = (state, action) => {
    state.tasks = state.tasks.filter(task => task.id !== action.payload);
    saveState(state); // Save updated state to localStorage
  }
export const ToggleCompleteNotes = (state, action) => {
    const task = state.tasks.find(task => task.id === action.payload);
    if (task) {
      task.completed = !task.completed;
      saveState(state); // Save updated state to localStorage
    }
}
// Start Timer action
export const StartTimmer = (state, action) => {
  const task = state.tasks.find(task => task.id === action.payload);
  if (task) {
      if (!task.isRunning) {
          task.isRunning = true;
          task.startTime = new Date().getTime(); // Save start time in milliseconds
      }
      saveState(state); // Save updated state to localStorage
  }
};
export const RunningTime = (state, action) => {
  
}
export const StopTimmer = (state, action) => {
  const task = state.tasks.find(task => task.id === action.payload);
  if (task && task.isRunning) {
      const endTime = new Date().getTime(); // Get current time in milliseconds
      const timeElapsed = endTime - task.startTime; // Calculate the elapsed time
      task.timeElapsed += timeElapsed; // Update the task's total elapsed time
      task.isRunning = false; // Set isRunning to false
      task.startTime = null; // Clear the start time
      task.currentTime = convertMillisToTime(task.timeElapsed); 
      saveState(state); // Save updated state to localStorage
  }
};
export const StartStopWatch = (state, action) => {
  // const task = state.tasks.find(task => task.id === action.payload.id);
  console.log(action.payload)
}
export const EndStopWatch = (state, action) => {
  // const task = state.tasks.find(task => task.id === action.payload.id);
  console.log(action.payload)
}
export const StopWatch = (state, action) => {

}