import { DeleteOutlined, DollarOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, Tag, Tooltip } from 'antd'
import { IUser } from '../apis/types'

export const getColumnsUserTable = (
	handleUpdate: (record: IUser) => void,
	handleDelete: (id: string) => void,
	handleChangeBalance: (id: string) => void
) => [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
		render: (id: string) => {
			return '...' + id.slice(-5)
		},
		width: 50,
	},
	{
		title: 'Username',
		dataIndex: 'username',
		key: 'username',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
		render: (role: 'admin' | 'user') => {
			return role === 'admin' ? (
				<Tag color='green'>Admin</Tag>
			) : (
				<Tag color='blue'>User</Tag>
			)
		},
		width: 50,
	},
	{
		title: 'Balance (VND)',
		dataIndex: 'balance',
		key: 'balance',
		width: 140,
	},
	{
		title: 'Note',
		dataIndex: 'note',
		key: 'note',
	},
	{
		title: 'Action',
		key: 'action',
		render: (_: any, record: IUser) => (
			<Space>
				<Tooltip title='Change balance'>
					<Button
						type='primary'
						onClick={() => {
							handleChangeBalance(record._id)
						}}
					>
						<DollarOutlined />
					</Button>
				</Tooltip>

				<Tooltip title='Update'>
					<Button
						type='primary'
						onClick={() => {
							handleUpdate(record)
						}}
					>
						<EditOutlined />
					</Button>
				</Tooltip>
				<Tooltip title='Delete'>
					<Button
						type='primary'
						danger
						onClick={() => {
							handleDelete(record._id)
						}}
					>
						<DeleteOutlined />
					</Button>
				</Tooltip>
			</Space>
		),
		width: 170,
	},
]
