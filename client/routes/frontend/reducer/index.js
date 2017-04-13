import { types } from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_POSTS_SUCCESS: {
      return [...action.payload]
    }
    default:
      return state
  }
};
