import { combineReducers } from 'redux'
import entities from './reducers/entities'
import posts from '../pages/posts/reducer'

export default combineReducers({
  entities,
  posts,
})

// export default (asyncReducers = {}) => (
//   combineReducers({
//     entities,
//     posts,
//     ...asyncReducers,
//   })
// )
