import { axiosPrivate, axiosPublic } from './axiosClient'
import { ILoginData, IProfileData, IRegisterData } from './types'

export const login = async (
	username: string,
	password: string
): Promise<ILoginData> => {
	const response = await axiosPublic.post('/auth/login', {
		username,
		password,
	})

	return response.data
}

export const register = async (
	username: string,
	password: string,
	confirmPassword: string
): Promise<IRegisterData> => {
	const response = await axiosPublic.post('/auth/register', {
		username,
		password,
		confirmPassword,
	})

	return response.data
}

export const getProfile = async (): Promise<IProfileData> => {
	const response = await axiosPrivate.get('/user/profile')

	return response.data
}
