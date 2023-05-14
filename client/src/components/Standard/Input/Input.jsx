import { useState } from 'react'

/* Styles */
import style from './Input.module.scss'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const Input = (props) => {
	const { label, errorMessage, onChange, autoFocus, isNotFocused, tooltip, ...inputProps } = props

	const [focused, setFocused] = useState(false)

	const focus: string = focused.toString()

	const handleFocus = () => {
		if (isNotFocused) {
			setFocused(false)
		} else {
			setFocused(true)
		}
	}

	return (
		<div className={`${style.field}`}>
			<input
				autoFocus={autoFocus}
				type="text"
				{...inputProps}
				onChange={(e) => onChange(e)}
				onBlur={handleFocus}
				focused={focus}
				className={style.input}
			/>

			{label && (
				<h4 className={style.label}>
					{label}
					{tooltip && (
						<div className={style.tooltip}>
							<Icon icon="circle-exclamation" className={style.tooltip__icon} />
							<div className={style.tooltip__span}>{tooltip}</div>
						</div>
					)}
				</h4>
			)}
			{errorMessage && <span className={style.error}>{errorMessage}</span>}
		</div>
	)
}
export default Input

