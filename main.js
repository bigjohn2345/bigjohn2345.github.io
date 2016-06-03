/* Loading resources in webpack way */
import './index.html'
import './scss/main.scss'
import './scss/tomorrow.scss'

/* Main program */
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

render(
	<App/>,
	document.getElementById('root')
)
