import { useState } from 'react'

/* Styles */
import style from './AddNewNote.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Components */
import Input from '../../Standard/Input/Input'
import { useCreateNoteMutation } from '../../../store/reducers/noteApi'

/* Default */

const defaultForm = {
	title: '',
	body: '',
	filters: ['Default']
}

export default function AddNewNote({ closeModal }) {
	const [form, setForm] = useState(defaultForm)

	const [newFilter, setNewFilter] = useState('')

	const [createNote] = useCreateNoteMutation()

	const handleChange = (e) => {
		if (e.target.name === 'newFilter') {
			setNewFilter(e.target.value)
		} else {
			setForm((prev) => ({
				...prev,
				[e.target.name]: e.target.value
			}))
		}
	}

	const handleDeleteFilter = (name) => {
		let updatedFilters = form.filters.filter((f) => f !== name)
		if (updatedFilters) {
			setForm((prev) => ({ ...prev, filters: updatedFilters }))
		}
	}

	const handleAddFilter = () => {
		const regex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{3,24}$/u
		if (regex.test(newFilter) === true) {
			let updatedFilters = [...form.filters, newFilter]
			if (updatedFilters) {
				setForm((prev) => ({ ...prev, filters: updatedFilters }))
				setNewFilter('')
			}
		} else {
			return
		}
	}

	const handleSubmitForm = (e) => {
		e.preventDefault()
		const newNote = { ...form, body: form.title }
		createNote(newNote)
		closeModal()
	}

	return (
		<form className={style.form} onSubmit={handleSubmitForm}>
			<Input
				className={'simple'}
				required={true}
				label={'title'}
				name={'title'}
				value={form.title}
				pattern={'^[A-Za-zА-Яа-яІіЇїЄєҐґ -]{3,24}$'}
				placeholder={'Enter the title'}
				errorMessage={'Wrong format'}
				onChange={handleChange}
				autoFocus={true}
			/>
			<div className={style.filters}>
				<div className={style.add}>
					<Input
						className={'simple'}
						name={'newFilter'}
						value={newFilter}
						pattern={'^[A-Za-zА-Яа-яІіЇїЄєҐґ]{3,24}$'}
						placeholder={'Enter the Filter'}
						onChange={handleChange}
					/>
					<button type="button" className={style.add__btn} onClick={handleAddFilter}>
						<Icon icon={'plus'} />
					</button>
				</div>
				<ul className={style.filters__list}>
					{form.filters.map((filter, index) => {
						return (
							<li key={index} className={style.filters__item}>
								{filter}
								<div className={style.delete} onClick={() => handleDeleteFilter(filter)}>
									<Icon icon="minus" />
								</div>
							</li>
						)
					})}
				</ul>
			</div>

			<button type="submit" className={style.create}>
				Create Note
			</button>
		</form>
	)
}

