import { useState } from 'react'

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

	const [activeId, setActiveId] = useState('')

	const { toggle: showAllNotes, handleToggle: toggleShowNotes } = useToggle(false)

	const displayNotes = showAllNotes ? notes : notes.slice(0, 5)

	const handleOpenNote = (id) => {
		navigate(`/note/${id}`)
		setActiveId(id)
	}

	return (
		<div className={style.sidebar}>
			<ul className={style.list}>
				{displayNotes?.map((note) => {
					const isActive = note._id === activeId
					return <ListItem note={note} key={note._id} isActive={isActive} handleClick={handleOpenNote} />
				})}
				{!showAllNotes && notes.length > 5 && (
					<li className={`${style.show}`} onClick={toggleShowNotes}>
						<span>{`+${notes.length - 5}`} more</span>
						<Icon icon="chevron-down" />
					</li>
				)}
				{showAllNotes && notes.length > 5 && (
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

