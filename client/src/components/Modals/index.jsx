/* Store */
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/reducers/modalSlice'

/* Styles */
import style from './index.module.scss'

/* Modals */
import DeleteNote from './DeleteNote/DeleteNote'
import AddNewNote from './AddNewNote/AddNewNote'
import EditNote from './EditNote/EditNote'

const Modals: React.FC = () => {
	const dispatch = useDispatch()
	// Get modal from store
	const modal = useSelector((store) => store.modal)

	// Get activeNote data
	const { activeNote } = useSelector((store) => store.note)

	// Close modal
	const handleClose = () => {
		dispatch(closeModal())
	}

	return (
		<>
			{modal.status && (
				<div className={style.overlay} onClick={handleClose}>
					<div className={style.modal} onClick={(e) => e.stopPropagation()}>
						{modal.name === 'DeleteNote' && <DeleteNote closeModal={handleClose} name={activeNote.title} id={activeNote._id} />}
						{modal.name === 'AddNewNote' && <AddNewNote closeModal={handleClose} />}
						{modal.name === 'EditNote' && <EditNote note={activeNote} closeModal={handleClose} />}
					</div>
				</div>
			)}
		</>
	)
}
export default Modals

