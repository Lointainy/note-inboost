import { useEffect, useState } from 'react'

// get value from localstorage
export const getValue = () => {
	const initialValue = localStorage.getItem('user-theme') === 'light-theme' ? false : true
	return initialValue
}

export function useTheme() {
	// theme, dark is true
	const [theme, setTheme] = useState(getValue)

	//theme from local or default 'light'
	const [userTheme, setUserTheme] = useState(localStorage.getItem('user-theme') || 'light-theme')

	// switch theme
	const toggleTheme = () => {
		setTheme(!theme)
		userTheme === 'dark-theme' ? setUserTheme('light-theme') : setUserTheme('dark-theme')
	}

	useEffect(() => {
		// check and add to local
		localStorage.setItem('user-theme', userTheme)
	}, [userTheme])

	return { theme, userTheme, toggleTheme }
}

export default useTheme

