import { types } from '../actions/entities'

export default (state = {}, action) => {
  switch (action.type) {
    case types.SET_POSTS_ENTITY:
      return {
        ...state,
        post: action.payload,
      }
    default:
      return state;
  }
}
