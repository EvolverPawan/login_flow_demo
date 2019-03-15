import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './helpers'
import { App } from './App'

// Load variables form .env file
import {} from 'dotenv/config'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
