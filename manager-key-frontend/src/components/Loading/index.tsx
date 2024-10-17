import { Space, Spin } from 'antd'

const Loading = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop: '30px',
			}}
		>
			<Space size='middle'>
				<Spin />
				<Spin />
				<Spin />
			</Space>
		</div>
	)
}

export default Loading
