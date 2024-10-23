import { Tag } from 'antd'

export const getColumnsUserTransactionTable = () => [
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
		title: 'Amount (VND)',
		dataIndex: 'amount',
		key: 'amount',
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
