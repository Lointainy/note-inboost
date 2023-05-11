/* Routes */
import { useNavigate } from 'react-router-dom'

/* Store */
import { useDeleteNoteMutation } from '../../../store/reducers/noteApi'

/* Styles */
import style from './DeleteNote.module.scss'

export default function DeleteNote(props) {
	const { closeModal, name, id } = props

	const [deleteNote] = useDeleteNoteMutation()

	const navigate = useNavigate()

	const handleDeleteNote = () => {
		closeModal()
		deleteNote({ id: id })
		navigate('/')
	}

	return (
		<div className={style.field}>
			<h2 className={style.title}>Delete Note</h2>
			<p className={style.desc}>
				{`Are you sure you want to delete the '${name}' note This action will remove all data and cannot
        be reversed.`}
			</p>
			<div className={style.btn__wrapper}>
				<button className={style.btn__delete} onClick={handleDeleteNote}>
					delete
				</button>
				<button className={style.btn__cancel} onClick={closeModal}>
					cancel
				</button>
			</div>
		</div>
	)
}

