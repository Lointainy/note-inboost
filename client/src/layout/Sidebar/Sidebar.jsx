/* Router */
import { useNavigate } from 'react-router-dom'

/* Hooks */
import { useToggle } from '../../hooks/useToggle'

/* Store */
import { useSelector } from 'react-redux'

/* Styles */
import style from './Sidebar.module.scss'

/* Components */
import ListItem from './ListItem'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function Sidebar() {
	const { notes } = useSelector((store) => store.note)

	const navigate = useNavigate()

	// Get activeId from store
	const { _id: activeId } = useSelector((store) => store.note.activeNote)

	const { toggle: showAllNotes, handleToggle: toggleShowNotes } = useToggle(false)

	// Slice notes for show more
	const maxShowNotes = 5
	const displayNotes = showAllNotes ? notes : notes.slice(0, maxShowNotes)

	const handleOpenNote = (id) => {
		navigate(`/note/${id}`)
	}

	return (
		<div className={style.sidebar}>
			<ul className={style.list}>
				{displayNotes?.map((note) => {
					const isActive = note._id === activeId
					return <ListItem note={note} key={note._id} isActive={isActive} handleClick={handleOpenNote} />
				})}
				{!showAllNotes && notes.length > maxShowNotes && (
					<li className={`${style.show}`} onClick={toggleShowNotes}>
						<span>{`+${notes.length - maxShowNotes}`} more</span>
						<Icon icon="chevron-down" />
					</li>
				)}
				{showAllNotes && notes.length > maxShowNotes && (
					<li className={style.show} onClick={toggleShowNotes}>
						<span>Show less</span>
						<Icon icon="chevron-up" />
					</li>
				)}
			</ul>
			{!notes.length && <div className={style.hint}>Please create your new note</div>}
		</div>
	)
}

