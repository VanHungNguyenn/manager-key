import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../apis/types'
import { RootState } from '../store'

interface AuthState {
	isLoggedIn: boolean
	isLoading: boolean
	token: string | null
	user: IUser | null
}

const initialState: AuthState = {
	isLoggedIn: false,
	isLoading: false,
	token: null,
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart(state) {
			state.isLoading = true
		},
		loginSuccess(
			state,
			action: PayloadAction<{ token: string; user: IUser }>
		) {
			state.isLoading = false
			state.isLoggedIn = true
			state.token = action.payload.token
			state.user = action.payload.user
		},
		loginFail(state) {
			state.isLoading = false
		},
		logout(state) {
			state.isLoggedIn = false
			state.token = null
			state.user = null
		},
	},
})

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions
export default authSlice.reducer
export const selectAuth = (state: RootState) => state.auth
