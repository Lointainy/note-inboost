import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
	notes: []
}

const defaultNote = {
	_id: '',
	title: 'New note',
	date: '',
	filter: ['default']
}

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		addNote: (state) => {
			state.notes = [...state.notes, { ...defaultNote, _id: uuidv4() }]
			console.log(JSON.stringify(state.notes))
		}
	}
})

export const { addNote } = noteSlice.actions

export default noteSlice.reducer

