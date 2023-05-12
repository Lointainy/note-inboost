import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: null,
	login: false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload.token
			state.login = true
			action.payload.rememberUser && localStorage.setItem('token', action.payload.token)
		},
		getToken: (state) => {
			const token = localStorage.getItem('token')
			if (token) {
				state.token = token
				state.login = true
			}
		},
		logout: (state) => {
			localStorage.removeItem('token')
			state.token = null
			state.login = false
		}
	}
})

export const { setToken, getToken, logout } = authSlice.actions
export default authSlice.reducer

