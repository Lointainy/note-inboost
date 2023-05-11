/* Styles */
import style from './EditorNote.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function EditorNote({ handleToggle, onChange, onKeyDown, body }) {
	return (
		<div className={style.note}>
			<div className={style.note__head}>
				<p className={style.hint}>
					Press <span className={style.hint__span}>Esc</span> or <span className={style.hint__span}>Enter + ctrl</span> for the end editing
				</p>
				<button onClick={handleToggle} className={style.close}>
					<Icon icon="circle-xmark" />
				</button>
			</div>
			<textarea value={body} onChange={onChange} className={style.textarea} autoFocus onKeyDown={onKeyDown}></textarea>
		</div>
	)
}

