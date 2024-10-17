import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAuth } from '../../redux/auth/authSlice'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
	const { isLoggedIn } = useSelector(selectAuth)

	if (isLoggedIn) return <Navigate to='/dashboard' />

	return children
}

export default PublicRoute
