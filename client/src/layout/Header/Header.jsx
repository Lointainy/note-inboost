/* Store */
import { toggleSidebar } from '../../store/reducers/uiSlice'
import { useDispatch } from 'react-redux'
import { addNote } from '../../store/reducers/noteSlice'
import { logout } from '../../store/reducers/authSlice'

/* Styles */
import style from './Header.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Components */
import { ThemeSwitcher, SearchBar } from '../../components'

export default function Header() {
	const dispatch = useDispatch()

	return (
		<div className={style.header}>
			<div className={style.options}>
				<div className={style.hidebar} onClick={() => dispatch(toggleSidebar())}>
					<Icon icon="bars" />
				</div>
				<div className={style.add} onClick={() => dispatch(addNote())}>
					<Icon icon="plus" />
				</div>

				<ThemeSwitcher />
			</div>
			<SearchBar />
			<button onClick={() => dispatch(logout())} className={style.logout}>
				<Icon icon="right-from-bracket" />
				<span>Logout</span>
			</button>
		</div>
	)
}

