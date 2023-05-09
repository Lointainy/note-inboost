import { useEffect } from 'react'

/* Routes */
import { Route, Routes, useLocation } from 'react-router-dom'

/* Hooks */
import useTheme from './hooks/useTheme'
import authWrapper from './hooks/authWrapper'

/* Store */
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from './store/reducers/uiSlice'

/* Styles */
import './App.scss'

/* Pages */
import { NotFoundPage, LoginPage, SignUpPage, NotePage } from './pages'

/* Components */
import { Modals } from './components'
import { Header, Sidebar } from './layout'

export const App = () => {
	const dispatch = useDispatch()

	// Routes
	const { pathname } = useLocation()

	// Get name of theme from localStorage or set default
	const { userTheme } = useTheme()

	const { colorTheme: theme, sidebar } = useSelector((store) => store.ui)
	const userLogined = useSelector((store) => store.auth.login)

	useEffect(() => {
		// Set theme name to store
		userTheme && dispatch(setTheme(userTheme))
	}, [dispatch, userTheme])
	if (userLogined && !pathname.includes('/login')) {
		return (
			<div className={`App ${theme}`}>
				<Modals />
				<Header />
				{sidebar && <Sidebar />}
				<div className={`page-content ${!sidebar ? 'fullsize' : ''}`}>
					<Routes>
						<Route path={'note/:noteId'} element={<NotePage />} />
						<Route path={'*'} element={<NotFoundPage />} />
					</Routes>
				</div>

				{/* <Workspace fullsize={!sidebar} /> */}
			</div>
		)
	}

	return (
		<div className={`App ${theme}`}>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	)
}

export default authWrapper(App)

