export const types = {
  GET_POSTS: 'GET_POSTS',
  GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
};

export const actions = {
  getPosts(payload) {
    return {
      type: types.GET_POSTS,
      payload,
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
  getPostsSuccess(payload) {
    return {
      type: types.GET_POSTS_SUCCESS,
      payload,
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
    }
  },
};
