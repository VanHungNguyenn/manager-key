import { Form, FormInstance, Input, Modal } from 'antd'

interface ChangeBalanceModalFormProps {
	visible: boolean
	onCancel: (e: React.MouseEvent<HTMLElement>) => void
	onSubmit: (values: any) => void
	form: FormInstance<any>
}

const ChangeBalanceModalForm = ({
	visible,
	onCancel,
	onSubmit,
	form,
}: ChangeBalanceModalFormProps) => {
	return (
		<Modal
			title='Change Balance'
			open={visible}
			onCancel={onCancel}
			okText='Change'
			onOk={() => form.submit()}
		>
			<Form form={form} layout='vertical' onFinish={onSubmit}>
				<Form.Item name='_id' hidden>
					<Input />
				</Form.Item>
				<Form.Item
					label='Amount'
					name='amount'
					rules={[
						{
							required: true,
							message: 'Please input amount you want to change!',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default ChangeBalanceModalForm
