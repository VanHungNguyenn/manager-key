import {
	ClockCircleFilled,
	LockOutlined,
	MailOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Space, Tag } from 'antd'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { changePassword } from '../../apis/Api'
import UserHistoryTransaction from '../../components/UserHistoryTransaction'
import { useMessage } from '../../context/useMessage'
import { selectAuth } from '../../redux/auth/authSlice'

const ProfilePage = () => {
	const [isChangingPassword, setIsChangingPassword] = useState(false)
	const [form] = Form.useForm()
	const { user } = useSelector(selectAuth)
	const messageApi = useMessage()
	const username = user?.username
	const email = user?.email
	const role = user?.role
	const createdAt = user?.createdAt

	const handleUpdatePassword = async () => {
		try {
			const values = form.getFieldsValue()
			const { oldPassword, newPassword, confirmPassword } = values
			const response = await changePassword(
				oldPassword,
				newPassword,
				confirmPassword
			)

			messageApi.success(response.message)
			setIsChangingPassword(false)
			form.resetFields()
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				messageApi.error(error?.response?.data?.message)
			} else {
				console.log('An error occurred')
			}
		}
	}

	return (
		<div>
			<Card type='inner' title='PROFILE'>
				<Row style={{ marginBottom: '16px' }}>
					{role === 'admin' && (
						<Tag
							color='green'
							style={{
								fontSize: '16px',
							}}
						>
							Admin
						</Tag>
					)}
				</Row>
				<Row style={{ marginBottom: '16px' }}>
					<Col xs={12} sm={8} xl={6}>
						<Space>
							<UserOutlined /> Username:
						</Space>
					</Col>
					<Col xs={12} sm={16} xl={18}>
						<span>{username}</span>
					</Col>
				</Row>
				<Row style={{ marginBottom: '16px' }}>
					<Col xs={12} sm={8} xl={6}>
						<Space>
							<MailOutlined /> Email:
						</Space>
					</Col>
					<Col xs={12} sm={16} xl={18}>
						<span>{email}</span>
					</Col>
				</Row>
				<Row style={{ marginBottom: '16px' }}>
					<Col xs={12} sm={8} xl={6}>
						<Space>
							<ClockCircleFilled /> Created Date:
						</Space>
					</Col>
					<Col xs={12} sm={16} xl={18}>
						<span>
							{createdAt &&
								new Date(createdAt).toLocaleDateString()}
						</span>
					</Col>
				</Row>
				<Row style={{ marginBottom: '16px' }}>
					<Button
						type='primary'
						onClick={() => {
							setIsChangingPassword(!isChangingPassword)
							form.resetFields()
						}}
					>
						<Space>
							<LockOutlined />
							Change Password
						</Space>
					</Button>
				</Row>
			</Card>

			{isChangingPassword && (
				<Card
					type='inner'
					title='Change Password'
					style={{ marginTop: '16px' }}
				>
					<Form
						form={form}
						name='change_password'
						initialValues={{ remember: true }}
					>
						<Form.Item
							name='oldPassword'
							label='Old Password'
							rules={[
								{
									required: true,
									message: 'Please input your old password!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='newPassword'
							label='New Password'
							rules={[
								{
									required: true,
									message: 'Please input your new password!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='confirmPassword'
							label='Confirm Password'
							dependencies={['newPassword']}
							hasFeedback
							rules={[
								{
									required: true,
									message:
										'Please confirm your new password!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (
											!value ||
											getFieldValue('newPassword') ===
												value
										) {
											return Promise.resolve()
										}
										return Promise.reject(
											new Error(
												'The two passwords that you entered do not match!'
											)
										)
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								onClick={handleUpdatePassword}
							>
								Update Password
							</Button>
						</Form.Item>
					</Form>
				</Card>
			)}
			<div
				style={{
					marginTop: '30px',
				}}
			>
				<UserHistoryTransaction />
			</div>
		</div>
	)
}

export default ProfilePage
