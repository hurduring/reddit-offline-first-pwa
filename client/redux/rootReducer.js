import { combineReducers } from 'redux'

const counter = (state = 10, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 100;
    case 'DECREMENT':
      return state - 20;
    default:
      return state;
  }
}

export default (asyncReducers = {}) => (
  combineReducers({
    counter,
    ...asyncReducers,
  })
)
