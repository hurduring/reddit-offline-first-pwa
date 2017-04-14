import { combineReducers } from 'redux'
import entities from './reducers/entities'

export default (asyncReducers = {}) => (
  combineReducers({
    entities,
    ...asyncReducers,
  })
)
