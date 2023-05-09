import { useEffect } from 'react'

/* Routes */
import { Route, Routes } from 'react-router-dom'

/* Hooks */
import useTheme from './hooks/useTheme'

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

export default function App() {
	const dispatch = useDispatch()

	// Get name of theme from localStorage or set default
	const { userTheme } = useTheme()

	// Status theme
	const { colorTheme: theme, sidebar } = useSelector((store) => store.ui)

	useEffect(() => {
		// Set theme name to store
		userTheme && dispatch(setTheme(userTheme))
	}, [dispatch, userTheme])

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

