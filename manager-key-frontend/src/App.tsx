import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getProfile } from './apis/Api'
import DashboardLayout from './components/layout/DashboardLayout'
import Loading from './components/Loading'
import { SESSION_TOKEN_KEY } from './constants'
import ErrorPage from './pages/ErrorPage'
import KeyPage from './pages/KeyPage'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import TopupPage from './pages/TopupPage'
import UsersPage from './pages/UsersPage'
import { loginFail, loginSuccess } from './redux/auth/authSlice'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<PublicRoute>
				<LoginPage />
			</PublicRoute>
		),
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
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
			{
				path: '/dashboard/keys',
				element: <KeyPage />,
			},
			{
				path: '/dashboard/topup',
				element: <TopupPage />,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
])

const App = () => {
	const [isCheckingToken, setIsCheckingToken] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		const checkToken = async () => {
			const token = sessionStorage.getItem(SESSION_TOKEN_KEY)

			if (token) {
				try {
					const response = await getProfile()
					const { user } = response
					dispatch(loginSuccess({ token, user }))
				} catch (error) {
					dispatch(loginFail())
				}
			}

			setIsCheckingToken(false)
		}

		checkToken()
	}, [dispatch])

	if (isCheckingToken) {
		return <Loading />
	}

	return (
		<div className='app'>
			<RouterProvider router={router} />
		</div>
	)
}

export default App
