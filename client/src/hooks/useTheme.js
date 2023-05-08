import { useEffect, useState } from 'react'

export const getValue = () => {
	const initialValue = localStorage.getItem('user-theme') === 'light-theme' ? false : true
	return initialValue
} // get value from localstorage

export function useTheme() {
	const [theme, setTheme] = useState() // dark is true
	const [userTheme, setUserTheme] = useState(localStorage.getItem('user-theme') || 'light-theme')
	//theme from local or default 'light'

	const toggleTheme = () => {
		setTheme(!theme)
		userTheme === 'dark-theme' ? setUserTheme('light-theme') : setUserTheme('dark-theme')
	} // switch

	useEffect(() => {
		localStorage.setItem('user-theme', userTheme)
	}, [userTheme]) // add to local

	return { theme, userTheme, toggleTheme }
}

export default useTheme

