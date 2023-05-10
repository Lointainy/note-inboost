import moment from 'moment'

/* Styles */
import style from './ListItem.module.scss'
import { useNavigate } from 'react-router-dom'

export default function ListItem({ note }) {
	const createdDate = moment(note.updatedAt)

	const navigate = useNavigate()

	const isToday = moment().isSame(createdDate, 'day')
	const displayDate = isToday ? createdDate.format('HH:mm') : createdDate.format('MMM DD')

	const handleOpenNote = (id) => {
		navigate(`/note/${id}`)
	}

	return (
		<li className={style.item} onClick={() => handleOpenNote(note._id)}>
			<div className={style.title}>{note.title}</div>
			<ul className={style.filter}>
				<li>{note.filter}</li>
			</ul>
			<div className={style.date}>{displayDate}</div>
		</li>
	)
}

