import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	notes: [],
	activeNote: {}
}

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		setNotes: (state, action) => {
			state.notes = action.payload
		},
		setAcitveNote: (state, action) => {
			state.activeNote = action.payload
		}
	}
})

export const { setNotes, setAcitveNote } = noteSlice.actions

export default noteSlice.reducer

