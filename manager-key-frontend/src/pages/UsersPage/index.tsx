import { Button, Col, Form, Input, Row, Table, Typography } from 'antd'

import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import {
	changeBalance,
	createNewUser,
	deleteUser,
	getListUsers,
	updateUser,
} from '../../apis/Api'
import { IUser } from '../../apis/types'
import ChangeBalanceModalForm from '../../components/ChangeBalanceModalForm'
import UserModalForm from '../../components/UserModalForm'
import { getColumnsUserTable } from '../../constants/userTable'
import { useMessage } from '../../context/useMessage'
import { useModal } from '../../context/useModal'

const { Title } = Typography

const UsersPage = () => {
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
		pageSizeOptions: ['5', '10', '20'],
		showSizeChanger: true,
	})

	const messageApi = useMessage()
	const modal = useModal()

	const { current, pageSize } = pagination

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [changeModalVisible, setChangeModalVisible] = useState(false)
	const [isAddMode, setIsAddMode] = useState(true)
	const [listUsers, setListUsers] = useState<IUser[]>([])
	const [loading, setLoading] = useState(false)
	const [search, setSearch] = useState('')

	const [form] = Form.useForm()
	const [changeBalanceForm] = Form.useForm()

	const fetchListUsers = useCallback(async () => {
		setLoading(true)
		try {
			const response = await getListUsers(current, pageSize, search)
			const { users } = response
			setListUsers(users)
		} finally {
			setLoading(false)
		}
	}, [current, pageSize, search])

	useEffect(() => {
		fetchListUsers()
	}, [current, pageSize, search, fetchListUsers])

	const showModal = (mode: 'add' | 'update') => {
		setIsAddMode(mode === 'add')
		setIsModalVisible(true)
	}

	const handleOpenUpdateModal = (record: IUser) => {
		showModal('update')
		form.setFieldsValue({
			...record,
			_id: record._id,
		})
	}

	const handleCancelUserModal = () => {
		setIsModalVisible(false)
		form.resetFields()
	}

	const handleOpenDeleteModal = async (id: string) => {
		modal.confirm({
			title: 'Are you sure delete this user?',
			content: 'When you click OK button, this user will be deleted',
			okText: 'Delete',
			okType: 'danger',
			cancelText: 'Cancel',
			onOk: () => handleDeleteUser(id),
		})
	}

	const handleDeleteUser = async (id: string) => {
		try {
			const response = await deleteUser(id)
			messageApi.success(response.message)
			fetchListUsers()
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				messageApi.error(error?.response?.data?.message)
			} else {
				console.log('An error occurred')
			}
		}
	}

	const handleOpenChangeBalanceModal = (id: string) => {
		setChangeModalVisible(true)
		changeBalanceForm.setFieldsValue({
			_id: id,
		})
	}

	const handleCancelChangeBalanceModal = () => {
		setChangeModalVisible(false)
		changeBalanceForm.resetFields()
	}

	const handleSubmitChangeBalanceModal = async (values: any) => {
		try {
			const { _id, amount } = values

			const response = await changeBalance(_id, amount)

			messageApi.success(response.message)
			setChangeModalVisible(false)
			changeBalanceForm.resetFields()
			fetchListUsers()
		} catch (error) {
			if (error instanceof AxiosError) {
				messageApi.error(error?.response?.data?.message)
			} else {
				console.log('An error occurred')
			}
		}
	}

	const handleSubmitUserModal = async (values: any) => {
		const { _id, username, password, email, role, note } = values

		try {
			let response

			if (isAddMode) {
				response = await createNewUser({
					username,
					email,
					role,
					password,
					note,
				})
			} else {
				response = await updateUser(_id, {
					password,
					email,
					role,
					note,
				})
			}

			messageApi.success(response.message)
			setIsModalVisible(false)
			form.resetFields()

			fetchListUsers()
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				messageApi.error(error?.response?.data?.message)
			} else {
				console.log('An error occurred')
			}
		}
	}

	const columns = getColumnsUserTable(
		handleOpenUpdateModal,
		handleOpenDeleteModal,
		handleOpenChangeBalanceModal
	)

	const handleTableChange = (pagination: any) => {
		setPagination((prev) => ({
			...prev,
			current: pagination.current,
			pageSize: pagination.pageSize,
		}))
	}

	return (
		<>
			<Row align='middle' justify='space-between'>
				<Col>
					<Title level={5}>MANAGER USER</Title>
				</Col>
				<Col>
					<Button type='primary' onClick={() => showModal('add')}>
						Add User
					</Button>
				</Col>
			</Row>
			<Row style={{ marginTop: '12px' }}>
				<Col xs={24} sm={12}>
					<Input
						placeholder='Search user'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Col>
			</Row>
			<Table
				style={{ marginTop: '30px' }}
				columns={columns}
				dataSource={listUsers}
				rowKey='_id'
				pagination={pagination}
				onChange={handleTableChange}
				loading={loading}
				bordered={true}
				scroll={{ x: '100%' }}
			/>
			<UserModalForm
				addMode={isAddMode}
				title={isAddMode ? 'ADD USER' : 'UPDATE USER'}
				visible={isModalVisible}
				onCancel={handleCancelUserModal}
				okText={isAddMode ? 'Add' : 'Update'}
				form={form}
				onSubmit={handleSubmitUserModal}
			/>
			<ChangeBalanceModalForm
				visible={changeModalVisible}
				onCancel={handleCancelChangeBalanceModal}
				onSubmit={handleSubmitChangeBalanceModal}
				form={changeBalanceForm}
			/>
		</>
	)
}

export default UsersPage
