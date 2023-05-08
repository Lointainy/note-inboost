/* Styles */
import { useSelector } from 'react-redux'
import style from './Sidebar.module.scss'
import ListItem from './ListItem'

export default function Sidebar() {
	const { notes } = useSelector((store) => store.note)
	return (
		<div className={style.sidebar}>
			<ul className={style.list}>
				{notes?.map((note) => {
					return <ListItem note={note} key={note._id} />
				})}
			</ul>
		</div>
	)
}

