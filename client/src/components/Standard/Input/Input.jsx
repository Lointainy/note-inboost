import { useState } from 'react'

/* Styles */
import style from './Input.module.scss'

const Input = (props) => {
	const { label, errorMessage, className, onChange, autoFocus, ...inputProps } = props

	const [focused, setFocused] = useState(false)

	const focus: string = focused.toString()

	const handleFocus = () => {
		setFocused(true)
	}

	return (
		<div className={`${style.field} ${className && style[className]}`}>
			<input
				autoFocus={autoFocus}
				type="text"
				{...inputProps}
				onChange={(e) => onChange(e)}
				onBlur={handleFocus}
				focused={focus}
				className={style.input}
			/>
			{label && <h4 className={style.label}>{label}</h4>}
			{errorMessage && <span className={style.error}>{errorMessage}</span>}
		</div>
	)
}
export default Input

