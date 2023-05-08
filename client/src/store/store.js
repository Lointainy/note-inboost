import { configureStore } from '@reduxjs/toolkit'

/* Reducers */
import noteReducer from './reducers/noteSlice'
import modalReducer from './reducers/modalSlice'

export const store = configureStore({
	reducer: {
		note: noteReducer,
		modal: modalReducer
	}
})

