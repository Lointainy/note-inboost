/* Styles */
import { useSelector } from 'react-redux'
import style from './Sidebar.module.scss'

export default function Sidebar() {
	const { notes } = useSelector((store) => store.note)
	return (
		<div className={style.sidebar}>
			{notes?.map((note) => {
				return <li key={note._id}>{note.title}</li>
			})}
		</div>
	)
}

