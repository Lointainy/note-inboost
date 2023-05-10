import { useState } from 'react'

export function useToggle(initialValue) {
	const [toggle, setToggle] = useState(initialValue)

	const handleToggle = () => {
		setToggle(!toggle)
	}

	return { toggle, setToggle, handleToggle }
}

