import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import Routes from './routes'

const App = ({ store }) => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

export default App
