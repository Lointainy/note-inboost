import moment from 'moment'

/* Hooks */
import { useToggle } from '../../../hooks/useToggle'

/* Styles */
import style from './ListItem.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function ListItem({ note, isActive, handleClick }) {
	// filtering to display the date
	const createdDate = moment(note.updatedAt)
	const isToday = moment().isSame(createdDate, 'day') // show if date is today
	const displayDate = isToday ? createdDate.format('HH:mm') : createdDate.format('MMM DD') // other days

	// Slice filters for show more
	const { toggle: showAllFilters, handleToggle: toggleFilters } = useToggle(false)
	const maxShowFilters = 2
	const displayFilters = showAllFilters ? note.filters : note.filters.slice(0, maxShowFilters)

	return (
		<li className={`${style.note} ${isActive ? style.active : ''}`} onClick={() => handleClick(note._id)}>
			<div className={style.date}>{displayDate}</div>
			<h1 className={style.title}>{note.title}</h1>
			<div className={style.filters}>
				<ul className={style.filters__list}>
					{displayFilters.map((filter, index) => {
						return (
							<li className={style.filters__item} key={index}>
								{filter}
							</li>
						)
					})}
					{!showAllFilters && note.filters.length > maxShowFilters && (
						<li className={`${style.show}`} onClick={toggleFilters}>
							<span>{`+${note.filters.length - 2}`}</span>
							<Icon icon="chevron-down" />
						</li>
					)}
					{showAllFilters && note.filters.length > maxShowFilters && (
						<li className={style.filters__item} onClick={toggleFilters}>
							<span>Show less</span>
							<Icon icon="chevron-up" />
						</li>
					)}
				</ul>
			</div>
		</li>
	)
}

