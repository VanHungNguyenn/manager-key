import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../../../assets/react.svg'
import { listNavAdmin, listNavUser } from '../../../constants/listNav'
import { selectAuth } from '../../../redux/auth/authSlice'
import MainHeader from '../MainHeader'

const { Sider, Content } = Layout

const DashboardLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()
	const navigate = useNavigate()
	const { user } = useSelector(selectAuth)
	const role = user?.role

	const listNavFilterRole = role === 'admin' ? listNavAdmin : listNavUser

	// Xác định defaultSelectedKeys
	const getDefaultSelectedKeys = () => {
		const path = window.location.pathname
		const keys: { [key: string]: string } = {
			'/dashboard': '1',
			'/dashboard/users': '2',
			'/dashboard/keys': '3',
			'/dashboard/topup': '4',
			'/dashboard/profile': '5',
		}
		return keys[path] ? [keys[path]] : []
	}

	const onChooseMenu: MenuProps['onClick'] = (e) => {
		const pathMap: { [key: string]: string } = {
			'1': '/dashboard',
			'2': '/dashboard/users',
			'3': '/dashboard/keys',
			'4': '/dashboard/topup',
			'5': '/dashboard/profile',
		}
		navigate(pathMap[e.key] || '/dashboard')
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				breakpoint='lg'
				trigger={null}
				collapsible
				collapsed={collapsed}
				onBreakpoint={setCollapsed}
			>
				<div
					style={{
						padding: '0 24px',
						margin: '16px 0 60px',
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
					}}
				>
					<Link
						to='/dashboard'
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						}}
					>
						<img
							src={logo}
							alt='logo'
							style={{ width: '50px', height: 'auto' }}
						/>
					</Link>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={getDefaultSelectedKeys()}
					items={listNavFilterRole}
					onClick={onChooseMenu}
				/>
			</Sider>
			<Layout>
				<MainHeader collapsed={collapsed} setCollapsed={setCollapsed} />
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}

export default DashboardLayout
