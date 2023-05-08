/* Store */
import { toggleSidebar } from '../../store/reducers/uiSlice'
import { useDispatch } from 'react-redux'

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
				<div className={style.toggle} onClick={() => dispatch(toggleSidebar())}>
					<Icon icon="bars" />
				</div>
				<div className={style.add}>
					<Icon icon="plus" />
				</div>

				<ThemeSwitcher />
			</div>
			<SearchBar />
		</div>
	)
}

