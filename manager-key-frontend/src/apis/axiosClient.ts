import axios from 'axios'
import { getToken } from '../utils'
import { SESSION_TOKEN_KEY } from '../constants'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const axiosPublic = axios.create({
	baseURL: VITE_BASE_URL,
})

const axiosPrivate = axios.create({
	baseURL: VITE_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosPrivate.interceptors.request.use(
	(config) => {
		const token = getToken()

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosPrivate.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if (error.response) {
			const { status } = error.response

			if (status === 401 || status === 403) {
				sessionStorage.removeItem(SESSION_TOKEN_KEY)
				window.location.href = '/'
			}
		} else if (error.request) {
			console.error('No response from server.')
		} else {
			console.error('Error setting up the request:', error.message)
		}

		return Promise.reject(error)
	}
)

export { axiosPublic, axiosPrivate }
