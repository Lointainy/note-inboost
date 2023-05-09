import { useState } from 'react'

/* Styles */
import style from './Input.module.scss'

const Input = (props) => {
	const { label, errorMessage, className, onChange, ...inputProps } = props

	const [focused, setFocused] = useState(false)

	const focus: string = focused.toString()

	const handleFocus = () => {
		setFocused(true)
	}

	return (
		<div className={`${style.field} ${className && style[className]}`}>
			<input
				autoFocus
				type="text"
				{...inputProps}
				onChange={(e) => onChange(e)}
				onBlur={handleFocus}
				focused={focus}
				className={style.input}
			/>
			<h4 className={style.label}>{label}</h4>
			<span className={style.error}>{errorMessage}</span>
		</div>
	)
}
export default Input

