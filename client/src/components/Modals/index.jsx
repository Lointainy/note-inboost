/* Store */
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/reducers/modalSlice'

/* Styles */
import style from './index.module.scss'

/* Modals */
import DeleteNote from './DeleteNote/DeleteNote'

const Modals: React.FC = () => {
	const dispatch = useDispatch()
	// Get modal from store
	const modal = useSelector((store) => store.modal)

	// Close modal
	const handleClose = () => {
		dispatch(closeModal())
	}

	return (
		<>
			{modal.status && (
				<div className={style.overlay} onClick={handleClose}>
					<div className={style.modal} onClick={(e) => e.stopPropagation()}>
						{modal.name === 'DeleteNote' && <DeleteNote />}
					</div>
				</div>
			)}
		</>
	)
}
export default Modals

