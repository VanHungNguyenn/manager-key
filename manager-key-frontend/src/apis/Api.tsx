import { axiosPrivate, axiosPublic } from './axiosClient'
import {
	IListTransaction,
	IListUsers,
	ILoginData,
	IProfileData,
	IRegisterData,
	IResponse,
} from './types'

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

export const getListUsers = async (
	page: number,
	limit: number
): Promise<IListUsers> => {
	const response = await axiosPrivate.get(
		`/user/all?page=${page}&limit=${limit}`
	)

	return response.data
}

export const createNewUser = async ({
	username,
	email,
	role,
	password,
	note,
}: {
	username: string
	email: string
	role: 'admin' | 'user'
	password: string
	note: string
}): Promise<IResponse> => {
	const response = await axiosPrivate.post('/user/create', {
		username,
		email,
		role,
		password,
		note,
	})

	return response.data
}

export const updateUser = async (
	id: string,
	{
		password,
		email,
		role,
		note,
	}: {
		password: string
		email: string
		role: 'admin' | 'user'
		note: string
	}
): Promise<IResponse> => {
	const response = await axiosPrivate.put(`/user/update/${id}`, {
		password,
		email,
		role,
		note,
	})

	return response.data
}

export const deleteUser = async (id: string): Promise<IResponse> => {
	const response = await axiosPrivate.delete(`/user/delete/${id}`)

	return response.data
}

export const changeBalance = async (
	id: string,
	amount: number
): Promise<IResponse> => {
	const response = await axiosPrivate.put(`/user/change-balance/${id}`, {
		amount,
	})

	return response.data
}

export const getListTransactions = async (
	page: number,
	limit: number
): Promise<IListTransaction> => {
	const response = await axiosPrivate.get(
		`/transaction/all/?page=${page}&limit=${limit}`
	)

	return response.data
}
