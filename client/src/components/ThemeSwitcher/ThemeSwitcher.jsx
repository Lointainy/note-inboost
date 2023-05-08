import { useEffect } from 'react'
import useTheme from '../../hooks/useTheme'
import { useDispatch } from 'react-redux'
import { setTheme } from '../../store/reducers/uiSlice'

import style from './ThemeSwitcher.module.scss'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function ThemeSwitcher() {
	const dispatch = useDispatch()

	const { userTheme, theme, toggleTheme } = useTheme()

	useEffect(() => {
		dispatch(setTheme(userTheme))
	}, [theme, dispatch, userTheme])

	return (
		<div className={style.theme}>
			<Icon icon="sun" className={`${style.icon} ${!theme && style.accent}`} />
			<label htmlFor="switcher" className={style.switch}>
				<input type="checkbox" id="switcher" checked={theme} onChange={toggleTheme} />
				<span className={style.slider}></span>
			</label>
			<Icon icon="moon" className={`${style.icon} ${theme && style.accent}`} />
		</div>
	)
}

