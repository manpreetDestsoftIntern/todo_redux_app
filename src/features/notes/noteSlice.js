import { createSlice } from '@reduxjs/toolkit';
import { AddNotes, RemoveNotes, StartTimmer, StopTimmer, ToggleCompleteNotes, StartStopWatch, EndStopWatch, StopWatch } from './actions';

// Function to load tasks from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tasks");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Error loading state:", error);
    return [];
  }
};

export const noteSlice = createSlice({
  name: 'note',
  initialState:  {
    tasks: loadState(), // Load tasks from localStorage on initial load
  },
  reducers: {
    add: AddNotes,
    remove: RemoveNotes,
    toggleComplete: ToggleCompleteNotes,
    startTimmer: StartTimmer,
    stopTimmer: StopTimmer,
    startStopWatch: StartStopWatch,
    endStopWatch: EndStopWatch,
    stopWatch: StopWatch
    }
});

// Action creators are generated for each case reducer function
export const { add, remove, toggleComplete, startTimmer, stopTimmer, startStopWatch, endStopWatch, stopWatch } = noteSlice.actions;

export default noteSlice.reducer;
