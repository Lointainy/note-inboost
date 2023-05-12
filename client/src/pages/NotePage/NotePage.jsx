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

import { MarkdownPreview, EditorNote } from '../../components'

export default function NotePage() {
	const dispatch = useDispatch()

	const { noteId } = useParams()

	// Toggler
	const { toggle: editing, setToggle: setEditing, handleToggle: handleToggleEditing } = useToggle(false)
	const { toggle: focusTextArea, setToggle: setFocusTextArea } = useToggle(false)

	// Set data to API
	const [updateNote] = useUpdateNoteMutation()

	// Get data from API
	const noteFromApi = useGetNoteByIdQuery(noteId)

	const noteRef = useRef({})

	// Set note data from API after requst
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

	const handleEditorOption = (name) => {
		let newBody = {
			task: '- [ ] - task',
			heading: '# Heading'
		}
		switch (name) {
			case 'AddTask':
				setNote({ ...note, body: note.body + `\n` + newBody.task })
				setFocusTextArea(true)
				setTimeout(() => {
					setFocusTextArea(false)
				}, 0)
				break
			case 'AddHeading':
				setNote({ ...note, body: note.body + `\n` + newBody.heading })
				setFocusTextArea(true)
				setTimeout(() => {
					setFocusTextArea(false)
				}, 0)
				break
			case 'Close':
				setEditing(false)
				break
			default:
				break
		}
	}

	useEffect(() => {
		// Set note data from API after requst
		if (noteFromApi.data) {
			const note = noteFromApi.data
			setNote(note)
			//Set active note to store
			dispatch(setAcitveNote(note))
		}
	}, [noteFromApi.data, noteFromApi.isSuccess])

	useEffect(() => {
		// If click outside stop editing
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
				<div className={style.body} ref={noteRef}>
					{editing ? (
						<EditorNote
							body={note?.body}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							handleOption={handleEditorOption}
							focus={focusTextArea}
						/>
					) : (
						<div onClick={handleToggleEditing} className={style.textfield}>
							<MarkdownPreview body={note?.body} />
						</div>
					)}
				</div>
			)}
		</div>
	)
}

