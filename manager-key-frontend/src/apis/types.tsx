export interface ILoginData {
	message: string
	token: string
	user: IUser
}

export interface IUser {
	_id: string
	username: string
	email: string
	role: 'admin' | 'user'
	balance: number
	note: string
	createdAt: string
	updatedAt: string
}

export interface IRegisterData {
	message: string
}

export interface IProfileData {
	message: string
	user: IUser
}
