import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAuth } from '../../redux/auth/authSlice'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isLoggedIn, user } = useSelector(selectAuth)

	return isLoggedIn && user?.role === 'admin' ? (
		children
	) : (
		<Navigate to='/dashboard' replace />
	)
}

export default ProtectedRoute
