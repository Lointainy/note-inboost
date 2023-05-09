import { configureStore } from '@reduxjs/toolkit'

/* Reducers */
import noteReducer from './reducers/noteSlice'
import modalReducer from './reducers/modalSlice'
import uiReducer from './reducers/uiSlice'
import { notesApi } from './reducers/noteApi'
import { authApi } from './reducers/authApi'
import authReducer from './reducers/authSlice'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[notesApi.reducerPath]: notesApi.reducer,
		note: noteReducer,
		modal: modalReducer,
		ui: uiReducer,
		auth: authReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, notesApi.middleware)
})

