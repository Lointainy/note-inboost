import { useRef, useEffect } from 'react'
/* Styles */
import style from './EditorNote.module.scss'

/* Component */
import { DropdownOptions } from '../../components'

export default function EditorNote(props) {
	const { onChange, onKeyDown, body, handleOption, focus } = props

	const options = [
		{ label: 'Add heading', onClick: () => handleOption('AddHeading') },
		{ label: 'Add task', onClick: () => handleOption('AddTask') },
		{ label: 'Close editing', error: true, onClick: () => handleOption('Close') }
	]

	const textRef = useRef({})

	// Check props.focus and current focus area
	useEffect(() => {
		if (focus) {
			textRef.current.focus()
		}
	}, [focus])

	return (
		<div className={style.note}>
			<div className={style.note__head}>
				<p className={style.hint}>
					Press <span className={style.hint__span}>Esc</span> or <span className={style.hint__span}>Enter + ctrl</span> for the end editing
				</p>
				<DropdownOptions options={options} fieldStyle={'invert'} />
			</div>
			<textarea ref={textRef} value={body} onChange={onChange} className={style.textarea} autoFocus onKeyDown={onKeyDown}></textarea>
		</div>
	)
}

