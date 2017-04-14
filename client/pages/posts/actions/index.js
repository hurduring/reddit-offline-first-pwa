export const types = {
  GET_POSTS: 'GET_POSTS',
  GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
};

export const actions = {
  getPosts(payload) {
    return { type: types.GET_POSTS, payload };
  },
  getPostsSuccess(payload) {
    return { type: types.GET_POSTS_SUCCESS, payload }
  },
};
