import type { InputRef } from 'antd'
import { Button, Form, Input, Typography } from 'antd'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../apis/Api'
import { useMessage } from '../../context/useMessage'

const { Title } = Typography

type FieldType = {
	username?: string
	password?: string
	confirmPassword?: string
	email?: string
}

const RegisterPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [email, setEmail] = useState('')

	const [loading, setLoading] = useState(false)

	const usernameRef = useRef<InputRef | null>(null)
	const messageApi = useMessage()

	const navigate = useNavigate()

	useEffect(() => {
		usernameRef.current?.focus()
	}, [])

	const handleRegister = async () => {
		try {
			setLoading(true)
			const response = await register(
				username,
				password,
				confirmPassword,
				email
			)

			const { message } = response
			messageApi.success(message)
			navigate('/')
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				messageApi.error(error?.response?.data?.message)
			} else {
				messageApi.error('An error occurred')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					maxWidth: '100vw',
					padding: '0 10px',
				}}
			>
				<Title
					level={2}
					style={{
						textAlign: 'center',
					}}
				>
					Register
				</Title>
				<div
					style={{
						marginTop: 20,
						minWidth: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Form
						name='basic'
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 20 }}
						style={{ maxWidth: 600, width: '100%' }}
						initialValues={{ remember: true }}
						autoComplete='off'
					>
						<Form.Item<FieldType>
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
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
						</Form.Item>

						<Form.Item<FieldType>
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
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</Form.Item>

						<Form.Item<FieldType>
							label='RePassword'
							name='confirmPassword'
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
							]}
						>
							<Input.Password
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								value={confirmPassword}
							/>
						</Form.Item>

						<Form.Item<FieldType>
							label='Email'
							name='email'
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								xs: { span: 24, offset: 0 },
								sm: { span: 20, offset: 4 },
							}}
						>
							<Button
								type='primary'
								htmlType='submit'
								style={{ width: '100%' }}
								onClick={handleRegister}
								disabled={loading}
							>
								Register
							</Button>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								xs: { span: 24, offset: 0 },
								sm: { span: 20, offset: 4 },
							}}
						>
							<Link to='/'>
								<Button type='link' style={{ width: '100%' }}>
									You already have an account? Login
								</Button>
							</Link>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	)
}

export default RegisterPage
