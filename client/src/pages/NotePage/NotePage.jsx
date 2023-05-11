import { useEffect, useRef, useState } from 'react'

/* Routes */
import { useParams } from 'react-router-dom'

/* Store */
import { useDispatch } from 'react-redux'
import { useGetNoteByIdQuery, useUpdateNoteMutation } from '../../store/reducers/noteApi'

/* Hooks */
import { useToggle } from '../../hooks/useToggle'

/* Styles */
import style from './NotePage.module.scss'

/* Components */
import ReactMarkdown from 'react-markdown'
import { setAcitveNote } from '../../store/reducers/noteSlice'

export default function NotePage() {
	const dispatch = useDispatch()
	const { noteId } = useParams()

	const { toggle, setToggle, handleToggle } = useToggle(false)

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
			setToggle(false)
		} else if (e.key === 'Enter' && e.ctrlKey) {
			setToggle(false)
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
				setToggle(false)
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
					{toggle ? (
						<textarea value={note?.body} onChange={handleChange} className={style.textarea} autoFocus onKeyDown={handleKeyDown}></textarea>
					) : (
						<div onClick={handleToggle} className={style.textfield}>
							<ReactMarkdown>{note?.body}</ReactMarkdown>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

