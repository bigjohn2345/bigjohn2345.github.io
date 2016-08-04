/* Loading resources in webpack way */
import './index.html'
import './scss/main.scss'
import './scss/tomorrow.scss'

/* Main program */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import DB from './components/DB'

render(
  <Provider store={DB}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
