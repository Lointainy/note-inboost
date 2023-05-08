/* Styles */
import './App.scss'

import { Modals, Workspace } from './components'
import { Header, Sidebar } from './layout'

/* Hooks */
import useTheme from './hooks/useTheme'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setTheme } from './store/reducers/uiSlice'

export default function App() {
	const dispatch = useDispatch()

	// Get name of theme from localStorage or set default
	const { userTheme } = useTheme()

	// Status theme
	const { colorTheme: theme } = useSelector((store) => store.ui)

	useEffect(() => {
		// Set theme name to store
		userTheme && dispatch(setTheme(userTheme))
	}, [dispatch])

	return (
		<div className={`App ${theme}`}>
			<Modals />
			<Header />
			<Sidebar />
			<Workspace />
		</div>
	)
}

