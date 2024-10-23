import { Col, Input, Row, Table, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { getListTransactions } from '../../apis/Api'
import { ITransaction } from '../../apis/types'
import { getColumnsTransactionTable } from '../../constants/transactionTable'
const { Title } = Typography
const TransactionPage = () => {
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
		pageSizeOptions: ['5', '10', '20'],
		showSizeChanger: true,
	})

	const { current, pageSize } = pagination
	const [listTransactions, setListTransactions] = useState<ITransaction[]>([])
	const [loading, setLoading] = useState(false)
	const [search, setSearch] = useState('')

	const fetchListTransactions = useCallback(async () => {
		setLoading(true)
		try {
			// Nếu đang tìm kiếm, nhảy về trang 1
			const currentPage = search ? 1 : current

			const response = await getListTransactions(
				currentPage,
				pageSize,
				search
			)
			const { transactions, total } = response

			// Cập nhật pagination và đặt current về 1 nếu có search
			setPagination((prev) => ({
				...prev,
				current: currentPage,
				total,
			}))

			setListTransactions(transactions)
		} finally {
			setLoading(false)
		}
	}, [current, pageSize, search])

	useEffect(() => {
		fetchListTransactions()
	}, [current, pageSize, search, fetchListTransactions])

	const handleTableChange = (pagination: any) => {
		setPagination((prev) => ({
			...prev,
			current: pagination.current,
			pageSize: pagination.pageSize,
		}))
	}

	const columns = getColumnsTransactionTable()

	return (
		<>
			<Row align='middle' justify='space-between'>
				<Col>
					<Title level={5}>MANAGER TRANSACTION</Title>
				</Col>
			</Row>
			{/* search input */}
			<Row style={{ marginTop: '12px' }}>
				<Col xs={24} sm={12}>
					<Input
						placeholder='Search transaction'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Col>
			</Row>
			<Table
				style={{ marginTop: '30px' }}
				columns={columns}
				scroll={{ x: 1000 }}
				dataSource={listTransactions}
				rowKey='_id'
				pagination={pagination}
				onChange={handleTableChange}
				loading={loading}
				bordered={true}
			/>
		</>
	)
}

export default TransactionPage
