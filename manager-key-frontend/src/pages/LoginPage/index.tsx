import type { InputRef } from 'antd'
import { Button, Form, Input, Typography } from 'antd'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../apis/Api'
import { SESSION_TOKEN_KEY } from '../../constants'
import { useMessage } from '../../context/useMessage'
import { loginFail, loginSuccess, selectAuth } from '../../redux/auth/authSlice'
import SessionStorage from '../../utils/sessionStorage'

const { Title } = Typography

type FieldType = {
	username?: string
	password?: string
}

const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const usernameRef = useRef<InputRef | null>(null)
	const messageApi = useMessage()

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { isLoggedIn, isLoading } = useSelector(selectAuth)

	useEffect(() => {
		usernameRef.current?.focus()
	}, [])

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/dashboard')
		}
	}, [isLoggedIn, navigate])

	const handleLogin = async () => {
		try {
			const response = await login(username, password)

			const { message, token, user } = response

			SessionStorage.setItem(SESSION_TOKEN_KEY, token)
			messageApi.success(message)
			dispatch(loginSuccess({ token, user }))
		} catch (error: unknown) {
			dispatch(loginFail())

			if (error instanceof AxiosError) {
				messageApi.error(error?.response?.data?.message)
			} else {
				messageApi.error('An error occurred')
			}
		}
	}

	const handleForgotPassword = () => {
		messageApi.info('Please contact admin to reset password')
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
					Login
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
						<Form.Item<FieldType> label='Password' name='password'>
							<Input.Password
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<Button onClick={handleForgotPassword} type='link'>
								Forgot password?
							</Button>
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
								onClick={handleLogin}
								disabled={isLoading}
							>
								Login
							</Button>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								xs: { span: 24, offset: 0 },
								sm: { span: 20, offset: 4 },
							}}
						>
							<Link to='/register'>
								<Button type='link' style={{ width: '100%' }}>
									Don't have an account? Register
								</Button>
							</Link>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	)
}

export default LoginPage
