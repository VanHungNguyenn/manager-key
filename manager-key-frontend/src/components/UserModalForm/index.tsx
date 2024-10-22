import { Form, FormInstance, Input, Modal, Select } from 'antd'

interface UserModalFormProps {
	addMode: boolean
	title: string
	visible: boolean
	onCancel: (e: React.MouseEvent<HTMLElement>) => void
	okText: string
	form: FormInstance<any>
	onSubmit: (values: any) => void
}

const UserModalForm = ({
	addMode,
	title,
	visible,
	onCancel,
	okText,
	form,
	onSubmit,
}: UserModalFormProps) => {
	const getPasswordRules = () => {
		const passwordRules: any = [
			{
				min: 6,
				message: 'Password must be at least 6 characters long',
			},
		]

		if (addMode) {
			passwordRules.push({
				required: true,
				message: 'Please input your password!',
			})
		}

		return passwordRules
	}

	return (
		<Modal
			title={title}
			open={visible}
			onCancel={onCancel}
			onOk={() => form.submit()}
			okText={okText}
		>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				<Form.Item name='_id' hidden>
					<Input />
				</Form.Item>
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
					<Input disabled={!addMode} />
				</Form.Item>
				<Form.Item
					label='Password'
					name='password'
					rules={getPasswordRules()}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label='Role'
					name='role'
					rules={[
						{
							required: true,
							message: 'Please input your role!',
						},
					]}
				>
					<Select placeholder='Select a role'>
						<Select.Option value='admin'>Admin</Select.Option>
						<Select.Option value='user'>User</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label='Email' name='email'>
					<Input />
				</Form.Item>
				<Form.Item label='Note' name='note'>
					<Input.TextArea rows={3} />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UserModalForm
