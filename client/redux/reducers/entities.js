import { types } from '../actions/entities'

export default (state = {}, action) => {
  switch (action.type) {
    case types.SET_POSTS_ENTITY:
      return {
        ...state,
        posts: action.payload,
      }
    default:
      return state;
  }
}
