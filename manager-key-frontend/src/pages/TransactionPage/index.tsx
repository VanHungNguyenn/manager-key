import { Col, Row, Table, Typography } from 'antd'
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
		pageSizeOptions: ['10', '20'],
		showSizeChanger: true,
	})

	const { current, pageSize } = pagination
	const [listTransactions, setListTransactions] = useState<ITransaction[]>([])
	const [loading, setLoading] = useState(false)

	const fetchListTransactions = useCallback(async () => {
		setLoading(true)
		try {
			const response = await getListTransactions(current, pageSize)
			const { transactions } = response
			setListTransactions(transactions)
		} finally {
			setLoading(false)
		}
	}, [current, pageSize])

	useEffect(() => {
		fetchListTransactions()
	}, [current, pageSize, fetchListTransactions])

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
			<Table
				style={{ marginTop: '30px' }}
				columns={columns}
				dataSource={listTransactions}
				rowKey='_id'
				pagination={pagination}
				onChange={handleTableChange}
				loading={loading}
				bordered={true}
				scroll={{ x: '100%' }}
			/>
		</>
	)
}

export default TransactionPage
