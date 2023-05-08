import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	notes: []
}

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {}
})

export const {} = noteSlice.actions

export default noteSlice.reducer

