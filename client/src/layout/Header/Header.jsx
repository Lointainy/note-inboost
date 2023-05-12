/* Store */
import { toggleSidebar } from '../../store/reducers/uiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/reducers/authSlice'
import { openModal } from '../../store/reducers/modalSlice'

/* Styles */
import style from './Header.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Components */
import { ThemeSwitcher, SearchBar } from '../../components'

export default function Header() {
	const dispatch = useDispatch()

	// If note is active then  shows buttons
	const { title: isActive } = useSelector((store) => store.note.activeNote)

	// Switch Options
	const handleClickOption = (name) => {
		switch (name) {
			case 'AddNewNote':
				dispatch(openModal({ name: 'AddNewNote' }))
				break
			case 'DeleteNote':
				dispatch(openModal({ name: 'DeleteNote' }))
				break
			case 'EditNote':
				dispatch(openModal({ name: 'EditNote' }))
				break
			case 'ToggleSidebar':
				dispatch(toggleSidebar())
				break
			case 'Logout':
				dispatch(logout())
				break
			default:
				break
		}
	}

	return (
		<div className={style.header}>
			<div className={style.options}>
				<div className={style.hidebar} onClick={() => handleClickOption('ToggleSidebar')}>
					<Icon icon="bars" />
				</div>
				<div className={style.add} onClick={() => handleClickOption('AddNewNote')}>
					<Icon icon="plus" />
				</div>
				{isActive && (
					<>
						<div className={style.delete} onClick={() => handleClickOption('DeleteNote')}>
							<Icon icon="trash" />
						</div>
						<div className={style.edit} onClick={() => handleClickOption('EditNote')}>
							<Icon icon="pen-to-square" />
						</div>
					</>
				)}

				<ThemeSwitcher />
			</div>
			<SearchBar />
			<button onClick={() => handleClickOption('Logout')} className={style.logout}>
				<Icon icon="right-from-bracket" />
				<span>Logout</span>
			</button>
		</div>
	)
}

