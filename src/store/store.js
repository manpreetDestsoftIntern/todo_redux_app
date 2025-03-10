import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import notesReducer from '../features/notes/noteSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer,
  },
})

