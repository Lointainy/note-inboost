import { useEffect } from 'react'

/* Routes */
import { Route, Routes, useLocation } from 'react-router-dom'

/* Hooks */
import authWrapper from './hooks/authWrapper'
import useTheme from './hooks/useTheme'

/* Store */
import { useDispatch, useSelector } from 'react-redux'
import { useGetNotesQuery } from './store/reducers/noteApi'
import { setTheme } from './store/reducers/uiSlice'

/* Styles */
import './App.scss'

/* Pages */
import { HomePage, LoginPage, NotFoundPage, NotePage, SignUpPage } from './pages'

/* Components */
import { Modals } from './components'
import { Header, Sidebar } from './layout'
import { setNotes } from './store/reducers/noteSlice'

export const App = () => {
	const dispatch = useDispatch()

	// Routes
	const { pathname } = useLocation()

	// Get name of theme from localStorage or set default
	const { userTheme } = useTheme()

	// Get data from API
	const notes = useGetNotesQuery('')

	const { colorTheme: theme, sidebar } = useSelector((store) => store.ui)
	const userLogined = useSelector((store) => store.auth.login)

	useEffect(() => {
		// Set theme name to store
		userTheme && dispatch(setTheme(userTheme))
	}, [dispatch, userTheme])

	useEffect(() => {
		// If user is logged in, fetch notes data and set it to store
		if (userLogined) {
			notes.refetch()
		}

		if (notes.data && notes.isSuccess) {
			dispatch(setNotes(notes.data))
		}
		// eslint-disable-next-line
	}, [userLogined, pathname, notes.data, notes.isLoading, notes.isSuccess])

	if (userLogined && !pathname.includes('/login')) {
		return (
			<div className={`App ${theme}`}>
				<div className="grid">
					<Modals />
					<Header />
					{sidebar && <Sidebar />}
					<div className={`page-content ${!sidebar ? 'fullsize' : ''}`}>
						<Routes>
							<Route index element={<HomePage />} />
							<Route path={'note/:noteId'} element={<NotePage />} />
							<Route path={'*'} element={<NotFoundPage />} />
						</Routes>
					</div>
				</div>
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

