/* Styles */
import { useSelector } from 'react-redux'
import style from './Sidebar.module.scss'
import ListItem from './ListItem'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
	const { notes } = useSelector((store) => store.note)

	const navigate = useNavigate()

	const [activeId, setActiveId] = useState('')

	const handleOpenNote = (id) => {
		navigate(`/note/${id}`)
		setActiveId(id)
	}

	return (
		<div className={style.sidebar}>
			<ul className={style.list}>
				{notes?.map((note) => {
					const isActive = note._id === activeId
					return <ListItem note={note} key={note._id} isActive={isActive} handleClick={handleOpenNote} />
				})}
			</ul>
		</div>
	)
}

