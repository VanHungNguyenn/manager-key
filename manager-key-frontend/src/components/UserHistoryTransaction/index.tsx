import { Col, Row, Table, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { getUserTransaction } from '../../apis/Api'
import { ITransaction } from '../../apis/types'
import { getColumnsUserTransactionTable } from '../../constants/userTransactionTable'

const { Title } = Typography

const UserHistoryTransaction = () => {
	const [loading, setLoading] = useState(false)
	const [listTransactions, setListTransactions] = useState<ITransaction[]>([])

	const columns = getColumnsUserTransactionTable()

	const fetchListTransactions = useCallback(async () => {
		setLoading(true)
		try {
			const response = await getUserTransaction()
			const { transactions } = response

			setListTransactions(transactions)
		} catch (error) {
			console.log('Failed to fetch list transactions: ', error)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchListTransactions()
	}, [fetchListTransactions])

	return (
		<>
			<Row>
				<Col span={24}>
					<Title level={4}>HISTORY TRANSACTIONS (5 lastest)</Title>
				</Col>
			</Row>
			<Table
				style={{ marginTop: '20px' }}
				columns={columns}
				scroll={{ x: 1000 }}
				dataSource={listTransactions}
				rowKey='_id'
				loading={loading}
				bordered={true}
			/>
		</>
	)
}

export default UserHistoryTransaction
