/* Styles */
import style from './SearchBar.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Hooks */
import useInput from '../../hooks/useInput'

export default function SearchBar() {
	const search = useInput('')

	const resetSearch = () => {
		search.setValue('')
	}

	return (
		<div className={style.search}>
			<input type="text" className={style.input} value={search.value} onChange={search.onChange} />
			{search.value && (
				<div className={style.close} onClick={resetSearch}>
					<Icon icon="circle-xmark" />
				</div>
			)}
		</div>
	)
}

