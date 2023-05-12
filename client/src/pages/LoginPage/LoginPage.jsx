import { useState } from 'react'

/* Routes */
import { NavLink } from 'react-router-dom'

/* Store */
import { useLoginMutation } from '../../store/reducers/authApi'
import { setToken } from '../../store/reducers/authSlice'
import { useDispatch } from 'react-redux'

/* Styles */
import style from './LoginPage.module.scss'

/* Components */
import { CheckBox, Input } from '../../components'

/* Utils */
import { defaultFormData } from '../../utils/form'

export default function LoginPage() {
	const dispatch = useDispatch()

	// Form data
	const [form, setForm] = useState(defaultFormData)

	// Check user data with API, if successful then login user
	const [login, { isError: loginError }] = useLoginMutation()

	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	// Remember user for next session
	const handleChecked = () => {
		setForm((prev) => ({ ...prev, rememberUser: !prev.rememberUser }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const { data } = await login(form)
			dispatch(setToken({ token: data.token, rememberUser: form.rememberUser }))
		} catch (error) {
			setForm(defaultFormData)
		}
	}

	return (
		<div className={style.login}>
			<div className={style.field}>
				<div className={style.header}>
					<h1 className={style.title}>Login user</h1>
					<NavLink to={'/signup'} className={style.link}>
						singup
					</NavLink>
				</div>

				<form onSubmit={handleSubmit} className={style.form}>
					<Input
						name={'email'}
						placeholder={'Enter the email'}
						errorMessage={'Wrong format'}
						required={true}
						pattern={'^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$'}
						label={'Email'}
						value={form.email}
						onChange={handleChange}
					/>

					<Input
						name={'password'}
						placeholder={'Enter the password'}
						errorMessage={'Password is not have correct format'}
						required={true}
						pattern={'^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^da-zA-Z]).{8,}$'}
						label={'Password'}
						value={form.password}
						onChange={handleChange}
					/>

					{loginError && <span className={style.error}>User is not found or Password in not correct</span>}

					<CheckBox title={'Remember me'} checked={form.rememberUser} onChange={handleChecked} />

					<button type="submit" className={`${style.btn}`} name="login">
						login
					</button>
				</form>
			</div>
		</div>
	)
}

