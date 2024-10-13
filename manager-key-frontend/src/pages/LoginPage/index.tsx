import { Button, Form, Input, Typography } from 'antd'
import { useRef, useState } from 'react'

const { Title } = Typography

const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const usernameRef = useRef(null)

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Title
				level={2}
				style={{
					textAlign: 'center',
				}}
			>
				Login
			</Title>
			<div
				style={{
					marginTop: 20,
					minWidth: 600,
				}}
			>
				<Form
					name='basic'
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600, width: '100%' }}
					initialValues={{ remember: true }}
					autoComplete='off'
				>
					<Form.Item
						label='Username'
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input
							ref={usernameRef}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
						<Button
							type='primary'
							htmlType='submit'
							style={{ width: '100%' }}
							// onClick={handleLogin}
							// disabled={isLoading}
						>
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default LoginPage
