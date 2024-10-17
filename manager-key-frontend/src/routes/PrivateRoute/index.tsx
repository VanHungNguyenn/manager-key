import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAuth } from '../../redux/auth/authSlice'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { isLoggedIn } = useSelector(selectAuth)

	return isLoggedIn ? <>{children}</> : <Navigate to='/' />
}

export default PrivateRoute
