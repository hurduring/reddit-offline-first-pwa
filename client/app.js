import React, { PropTypes } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Routes from './routes'

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
)

export default App
