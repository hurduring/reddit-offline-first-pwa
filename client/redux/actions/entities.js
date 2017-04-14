export const types = {
  SET_POSTS_ENTITY: 'SET_POSTS_ENTITY',
}

export const actions = {
  setPostsEntity(action) {
    return { type: types.SET_POSTS_ENTITY, payload: action };
  },
}
