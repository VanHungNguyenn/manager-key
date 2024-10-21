import {
	AppstoreAddOutlined,
	KeyOutlined,
	MoneyCollectOutlined,
	ProfileOutlined,
	UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const createMenuItems = (isAdmin: boolean): MenuItem[] => {
	const commonItems: MenuItem = {
		type: 'group',
		children: [
			{
				key: '1',
				icon: <AppstoreAddOutlined />,
				label: 'Overview',
			},
			{
				key: '4',
				icon: <MoneyCollectOutlined />,
				label: 'Topup',
			},
			{
				key: '5',
				icon: <ProfileOutlined />,
				label: 'Profile',
			},
		],
	}

	if (isAdmin) {
		return [
			commonItems,
			{
				type: 'divider',
			},
			{
				type: 'group',
				children: [
					{
						key: '2',
						icon: <UserOutlined />,
						label: 'Manager Users',
					},
					{
						key: '3',
						icon: <KeyOutlined />,
						label: 'Manager Keys',
					},
				],
			},
		]
	}

	return [commonItems]
}

export const listNavUser: MenuItem[] = createMenuItems(false)
export const listNavAdmin: MenuItem[] = createMenuItems(true)
