export const types = {
  SET_POSTS_ENTITY: 'SET_POSTS_ENTITY',
}

export const actions = {
  setPostsEntity(action) {
    return {
      type: types.SET_POSTS_ENTITY,
      payload: action,
      meta: {
        offline: {
          // the network action to execute:
          effect: { url: '/derp', method: 'GET', body: { user: '1' } },
          // action to dispatch when effect succeeds:
          commit: { type: 'FOLLOW_USER_COMMIT', meta: { user: '1' } },
          // action to dispatch if network action fails permanently:
          rollback: { type: 'FOLLOW_USER_ROLLBACK', meta: { user: '1' } }
        },
      },
    };
  },
}
