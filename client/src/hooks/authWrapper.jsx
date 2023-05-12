import { useEffect, useState } from 'react'

/* Routes */
import { Navigate, useLocation } from 'react-router-dom'

/* Store */
import { getToken } from '../store/reducers/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const AuthWrapper = (WrappedComponent) => {
	const AuthWrapperComponent = (props) => {
		const dispatch = useDispatch()

		const { pathname } = useLocation()

		const userLogined = useSelector((store) => store.auth.login)

		// Switch mounted component
		const [isMounted, setIsMounted] = useState(false)

		useEffect(() => {
			// Check token key
			dispatch(getToken())

			// Set isMounted to true after first render
			setIsMounted(true)
		}, [dispatch])

		if (!userLogined && pathname !== '/login' && pathname !== '/signup' && isMounted) {
			return <Navigate to="/login" />
		}

		if (userLogined && (pathname === '/login' || pathname === '/signup') && isMounted) {
			return <Navigate to="/" />
		}

		return <WrappedComponent {...props} />
	}

	return AuthWrapperComponent
}

export default AuthWrapper

