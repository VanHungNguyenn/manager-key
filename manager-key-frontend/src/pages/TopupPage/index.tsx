import { CopyOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { depositInstruction, renderBankInfo } from '../../constants'
import { useMessage } from '../../context/useMessage'
import { selectAuth } from '../../redux/auth/authSlice'

const { Title, Text } = Typography

const TopupPage = () => {
	const { user } = useSelector(selectAuth)
	const username = user?.username
	const messageApi = useMessage()

	const bankInfo = renderBankInfo(username)

	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				messageApi.success(`Copied: ${text}`)
			})
			.catch(() => {
				messageApi.error('Failed to copy!')
			})
	}

	return (
		<>
			<Row>
				<Col span={24}>
					<Title level={4}>ADD FUNDS TO ACCOUNT</Title>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={12}>
					<Card type='inner' title='Deposit via QR code'>
						<div style={{ marginTop: 20, textAlign: 'center' }}>
							<img
								src={`https://img.vietqr.io/image/cake-0356422823-print.jpg`}
								alt='QR Code'
								style={{
									maxWidth: '350px',
									width: '100%',
									height: 'auto',
								}}
							/>
						</div>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<Card type='inner' title='Deposit via bank account'>
								{bankInfo.map((info, index) => (
									<Row
										key={index}
										style={{
											marginBottom: '16px',
										}}
									>
										<Col
											span={14}
											style={{
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<Text
												style={{
													marginBottom: 0,
													textTransform: 'uppercase',
													fontWeight: 'bold',
												}}
											>
												{info.label}:
											</Text>
										</Col>
										<Col
											span={8}
											style={{
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<Text>{info.value}</Text>
										</Col>
										<Col span={2}>
											<Button
												icon={<CopyOutlined />}
												onClick={() =>
													copyToClipboard(info.value)
												}
												style={{ marginLeft: '8px' }}
											/>
										</Col>
									</Row>
								))}
							</Card>
						</Col>
						<Col span={24}>
							<Card type='inner' title='How to Deposit Money'>
								{depositInstruction.map(
									(depositInst: string, index: number) => (
										<div key={index}>{depositInst}</div>
									)
								)}
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	)
}

export default TopupPage
