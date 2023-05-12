import { useEffect } from 'react'
import moment from 'moment'

/* Routes*/
import { useNavigate } from 'react-router-dom'

/* Hooks */
import useInput from '../../hooks/useInput'
import { useToggle } from '../../hooks/useToggle'

/* Store */
import { useSelector } from 'react-redux'

/* Styles */
import style from './SearchBar.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import React from 'react'

export default function SearchBar() {
	const navigate = useNavigate()

	const search = useInput('')

	const { notes } = useSelector((store) => store.note)

	const { toggle: dropdown, setToggle: setDropdown } = useToggle(false)

	// filtered notes from search value
	let searchOptions = notes
		.filter((note) => note.title.toLowerCase().includes(search.value.toLowerCase()))
		.map((note) => {
			const createdDate = moment(note.updatedAt)
			const isToday = moment().isSame(createdDate, 'day') // show if date is today
			const displayDate = isToday ? createdDate.format('HH:mm') : createdDate.format('MMM DD') // other days
			return { label: note.title, date: displayDate, onClick: () => handleOpenNote(note._id) }
		})

	function resetSearch() {
		search.setValue('')
	}

	function handleOpenNote(id) {
		navigate(`/note/${id}`)
		setDropdown(false)
		resetSearch()
	}

	useEffect(() => {
		if (search.value.length && searchOptions.length) {
			setDropdown(true)
		} else {
			setDropdown(false)
		}
	}, [search.value])

	return (
		<div className={`${style.search} ${dropdown ? style.active : ''}`}>
			<input
				className={style.input}
				type="search"
				name={'search'}
				value={search.value}
				onChange={search.onChange}
				placeholder={'Search note'}
			/>
			{search.value && (
				<div className={style.close} onClick={resetSearch}>
					<Icon icon="circle-xmark" />
				</div>
			)}
			{dropdown && (
				<div className={style.dropdown}>
					<ul className={style.list}>
						{searchOptions.map((option, index) => {
							return (
								<li className={style.item} key={index} onClick={option.onClick}>
									<span>{option.label}</span>
									<p>{option.date}</p>
								</li>
							)
						})}
					</ul>
				</div>
			)}
		</div>
	)
}

