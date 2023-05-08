import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

/* Store */
import { Provider } from 'react-redux'
import { store } from './store/store'

/* Styles */
import './styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
reportWebVitals()

