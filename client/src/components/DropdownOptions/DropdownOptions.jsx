import { useEffect, useRef } from 'react'

/* Hooks */
import { useToggle } from '../../hooks/useToggle'

/* Styles */
import style from './DropdownOptions.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function DropdownOptions({ options, fieldStyle }) {
	const { toggle: dropdown, setToggle: setDropdown, handleToggle: toggleDropdown } = useToggle(false)

	const dropdownRef = useRef({})

	const handleClickOption = (option) => {
		option.onClick()
		setDropdown(false)
	}

	useEffect(() => {
		// Check if click outside, then close dropdown area
		const handleOutsideClick = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdown(false)
			}
		}
		document.addEventListener('mousedown', handleOutsideClick)

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	return (
		<div className={`${style.option}`} ref={dropdownRef}>
			<button className={`${style.button}`} onClick={toggleDropdown}>
				option
				<Icon icon="chevron-down" className={style.icon} />
			</button>
			{dropdown && (
				<div className={`${style.dropdown} ${fieldStyle && style[fieldStyle]}`} onClick={(e) => e.stopPropagation()}>
					<ul className={style.list}>
						{options.map((option, index) => (
							<li className={`${style.item} ${option.error && style.error}`} key={index} onClick={() => handleClickOption(option)}>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

