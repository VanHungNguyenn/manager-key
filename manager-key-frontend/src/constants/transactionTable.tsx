import { Tag } from 'antd';

export const getColumnsTransactionTable = () => [
	{
		title: 'Username',
		dataIndex: 'userId',
		key: 'userId',
		render: (userId: { _id: string; username: string }) => {
			return userId.username
		},
		fixed: true,
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
		title: 'From Bank name',
		dataIndex: 'fromBankName',
		key: 'fromBankName',
	},
	{
		title: 'From Account number',
		dataIndex: 'fromAccountNumber',
		key: 'fromAccountNumber',
	},
	{
		title: 'Amount (VND)',
		dataIndex: 'amount',
		key: 'amount',
	},
	{
		title: 'Bank name',
		dataIndex: 'bankName',
		key: 'bankName',
	},
	{
		title: 'Account number',
		dataIndex: 'bankAccountNumber',
		key: 'bankAccountNumber',
	},
	{
		title: 'Short Code',
		dataIndex: 'shortCode',
		key: 'shortCode',
	},
	{
		title: 'Content',
		dataIndex: 'content',
		key: 'content',
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
