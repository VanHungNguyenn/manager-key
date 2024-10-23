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

export interface IListUsers {
	message: string
	users: IUser[]
	total: number
}

export interface IResponse {
	message: string
}

export interface ITransaction {
	_id: string
	username: string
	type: 'manual' | 'auto'
	bankName: string
	amount: number
	bankAccountNumber: string
	fromAccountNumber: string
	fromBankName: string
	content: string
	mailId: string
	mailDate: string
	shortCode: string
	createdAt: string
	updatedAt: string
}

export interface IListTransaction {
	message: string
	transactions: ITransaction[]
	total: number
}

export interface IStatisticOverview {
	data: {
		totalUser: number
		totalTransaction: number
		totalDeposit: number
	}
}
