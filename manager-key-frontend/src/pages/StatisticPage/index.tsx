import {
	DollarCircleTwoTone,
	PieChartTwoTone,
	UserAddOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { getStatisticOverview } from '../../apis/Api'

const StatisticPage = () => {
	const [overview, setOverview] = useState({
		totalUser: 0,
		totalTransaction: 0,
		totalDeposit: 0,
	})

	const fetchStatisticOverview = async () => {
		try {
			const response = await getStatisticOverview()
			const { data } = response
			setOverview(data)
		} catch (error) {
			console.log('An error occurred')
		}
	}

	useEffect(() => {
		fetchStatisticOverview()
	}, [])

	return (
		<Row gutter={[16, 16]}>
			<Col xs={24} lg={12} xl={6}>
				<Card>
					<Statistic
						title='Active Users'
						value={overview.totalUser}
						prefix={<UserAddOutlined />}
					/>
				</Card>
			</Col>
			<Col xs={24} lg={12} xl={6}>
				<Card>
					<Statistic
						title='Total Transactions'
						value={overview.totalTransaction}
						prefix={<PieChartTwoTone />}
					/>
				</Card>
			</Col>
			<Col xs={24} lg={12} xl={6}>
				<Card>
					<Statistic
						title='Total Deposit'
						value={overview.totalDeposit}
						prefix={<DollarCircleTwoTone />}
					/>
				</Card>
			</Col>
		</Row>
	)
}

export default StatisticPage
