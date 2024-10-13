import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../../../assets/react.svg'

const { Header, Sider, Content } = Layout

const DashboardLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider
				breakpoint='lg'
				trigger={null}
				collapsible
				collapsed={collapsed}
				onBreakpoint={(broken) => {
					setCollapsed(broken)
				}}
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
							style={{
								width: '50px',
								height: 'auto',
							}}
						/>
					</Link>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <VideoCameraOutlined />,
							label: 'Overview',
						},
						{
							key: '2',
							icon: <UserOutlined />,
							label: 'Manager Users',
						},
						{
							key: '3',
							icon: <UploadOutlined />,
							label: 'nav 3',
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type='text'
						icon={
							collapsed ? (
								<MenuUnfoldOutlined />
							) : (
								<MenuFoldOutlined />
							)
						}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
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
