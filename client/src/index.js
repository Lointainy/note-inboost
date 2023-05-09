import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

import App from './App'

/* Router */
import { BrowserRouter as Router } from 'react-router-dom'

/* Store */
import { Provider } from 'react-redux'
import { store } from './store/store'

/* Styles */
import './styles/main.scss'

/* ICONS */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faBars, faPlus, faSun, faMoon, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faBars, faPlus, faSun, faMoon, faCircleXmark)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
)
reportWebVitals()

