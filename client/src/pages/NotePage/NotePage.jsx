import { useEffect, useRef, useState } from 'react'

/* Routes */
import { useParams } from 'react-router-dom'

/* Store */
import { useDispatch } from 'react-redux'
import { useGetNoteByIdQuery, useUpdateNoteMutation } from '../../store/reducers/noteApi'
import { setAcitveNote } from '../../store/reducers/noteSlice'

/* Hooks */
import { useToggle } from '../../hooks/useToggle'

/* Styles */
import style from './NotePage.module.scss'

/* Components */
import ReactMarkdown from 'react-markdown'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function NotePage() {
	const dispatch = useDispatch()

	const { noteId } = useParams()

	const { toggle: editing, setToggle: setEditing, handleToggle: handleToggleEditing } = useToggle(false)

	const [updateNote] = useUpdateNoteMutation()

	const noteRef = useRef({})

	const noteFromApi = useGetNoteByIdQuery(noteId)

	const [note, setNote] = useState({})

	const handleChange = (e) => {
		const newNote = { ...note, body: e.target.value }
		setNote(newNote)
		updateNote({ id: noteId, note: newNote })
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			setEditing(false)
		} else if (e.key === 'Enter' && e.ctrlKey) {
			setEditing(false)
		}
	}

	useEffect(() => {
		if (noteFromApi.data) {
			const note = noteFromApi.data
			setNote(note)
			dispatch(setAcitveNote(note))
		}
	}, [noteFromApi.data, noteFromApi.isSuccess])

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (noteRef.current && !noteRef.current.contains(event.target)) {
				setEditing(false)
			}
		}
		document.addEventListener('mousedown', handleOutsideClick)

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	return (
		<div className={style.page}>
			{noteFromApi.isLoading ? (
				<span className={style.msg}>Loading...</span>
			) : (
				<div className={style.note} ref={noteRef}>
					{editing ? (
						<>
							<div className={style.note__head}>
								<p className={style.hint}>
									Press <span className={style.hint__span}>Esc</span> or <span className={style.hint__span}>Enter + ctrl</span> for the end
									editing
								</p>
								<button onClick={handleToggleEditing} className={style.close}>
									<Icon icon="circle-xmark" />
								</button>
							</div>
							<textarea
								value={note?.body}
								onChange={handleChange}
								className={style.textarea}
								autoFocus
								onKeyDown={handleKeyDown}
							></textarea>
						</>
					) : (
						<div onClick={handleToggleEditing} className={style.textfield}>
							<ReactMarkdown>{note?.body}</ReactMarkdown>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

