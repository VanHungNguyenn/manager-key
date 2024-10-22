import { Tag } from 'antd'

export const getColumnsTransactionTable = () => [
	{
		title: 'Username',
		dataIndex: 'userId',
		key: 'userId',
		render: (userId: { _id: string; username: string }) => {
			return userId.username
		},
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
		render: (type: 'manual' | 'auto') => {
			return type === 'manual' ? (
				<Tag color='green'>Manual</Tag>
			) : (
				<Tag color='blue'>Auto</Tag>
			)
		},
	},
	{
		title: 'Bank name',
		dataIndex: 'bankName',
		key: 'bankName',
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
	},
	{
		title: 'Bank account number',
		dataIndex: 'bankAccountNumber',
		key: 'bankAccountNumber',
	},
	{
		title: 'Content',
		dataIndex: 'content',
		key: 'content',
	},
	{
		title: 'Short Code',
		dataIndex: 'shortCode',
		key: 'shortCode',
	},
	{
		title: 'Created at',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (createdAt: string) => {
			return new Date(createdAt).toLocaleString() // Hiển thị cả ngày và giờ
		},
	},
]
