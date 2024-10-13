import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import UsersPage from './pages/UsersPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage />,
	},
	{
		path: '/dashboard',
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				element: <OverviewPage />,
			},
			{
				path: '/dashboard/users',
				element: <UsersPage />,
			},
			{
				path: '/dashboard/settings',
				element: <SettingsPage />,
			},
			{
				path: '/dashboard/profile',
				element: <ProfilePage />,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
])

const App = () => {
	return (
		<div className='app'>
			<RouterProvider router={router} />
		</div>
	)
}

export default App
