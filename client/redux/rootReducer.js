import { combineReducers } from 'redux';

const counter = (state = 10, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 100;
    case 'DECREMENT':
      return state - 2;
    default:
      return state;
  }
};

export default combineReducers({
  counter,
});