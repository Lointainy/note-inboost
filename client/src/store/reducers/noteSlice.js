import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const initialState = {
	notes: []
}

const defaultNote = {
	_id: '',
	title: 'New note',
	updatedDate: '',
	filter: ['default']
}

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		addNote: (state) => {
			state.notes = [...state.notes, { ...defaultNote, _id: uuidv4(), updatedAt: moment().format() }]
			console.log(JSON.stringify(state.notes))
		}
	}
})

export const { addNote } = noteSlice.actions

export default noteSlice.reducer

