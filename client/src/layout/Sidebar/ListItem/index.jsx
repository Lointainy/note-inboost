import moment from 'moment'

/* Styles */
import style from './ListItem.module.scss'

export default function ListItem({ note }) {
	const createdDate = moment(note.updatedAt)

	const isToday = moment().isSame(createdDate, 'day')
	const displayDate = isToday ? createdDate.format('HH:mm') : createdDate.format('MMM DD')
	return (
		<li className={style.item}>
			<div className={style.title}>{note.title}</div>
			<ul className={style.filter}>
				<li>{note.filter}</li>
			</ul>
			<div className={style.date}>{displayDate}</div>
		</li>
	)
}

