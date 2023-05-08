/* Styles */
import style from './SearchBar.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Hooks */
import useInput from '../../hooks/useInput'

export default function SearchBar() {
	const search = useInput('')
	return (
		<div className={style.search}>
			<input type="text" className={style.input} {...search} />
			{search.value && (
				<div className={style.close}>
					<Icon icon="circle-xmark" />
				</div>
			)}
		</div>
	)
}

