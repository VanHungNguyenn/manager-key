import SessionStorage from './sessionStorage'
import { SESSION_TOKEN_KEY } from '../constants'

export const getToken = (): string => {
	return SessionStorage.getItem(SESSION_TOKEN_KEY) ?? ''
}
