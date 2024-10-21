import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown, Layout, Space, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMessage } from '../../../context/useMessage'
import { logout, selectAuth } from '../../../redux/auth/authSlice'
import SessionStorage from '../../../utils/sessionStorage'
const { Header } = Layout

interface MainHeaderProps {
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
}

const MainHeader = ({ collapsed, setCollapsed }: MainHeaderProps) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const messageApi = useMessage()

	const { user } = useSelector(selectAuth)
	const username = user?.username

	const items: MenuProps['items'] = [
		{
			label: (
				<Space
					onClick={() => {
						handleLogout()
					}}
				>
					<span>Logout</span>
				</Space>
			),
			key: '2',
			icon: <LogoutOutlined />,
			danger: true,
		},
	]

	const handleLogout = () => {
		SessionStorage.clear()
		dispatch(logout())
		messageApi.success('Logout successfully')
		navigate('/')
	}

	return (
		<Header
			style={{
				padding: 0,
				background: colorBgContainer,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Button
				type='text'
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{
					fontSize: '16px',
					width: 64,
					height: 64,
				}}
			/>
			<Dropdown
				menu={{
					items,
				}}
				trigger={['click']}
				placement='bottomRight'
				arrow
			>
				<Space
					style={{
						cursor: 'pointer',
						marginRight: 20,
					}}
				>
					<span
						style={{
							fontWeight: 600,
							fontStyle: 'italic',
						}}
					>
						{username}
					</span>
					<Avatar
						icon={<UserOutlined />}
						style={{
							backgroundColor: '#87d068',
						}}
					/>
				</Space>
			</Dropdown>
		</Header>
	)
}

export default MainHeader
