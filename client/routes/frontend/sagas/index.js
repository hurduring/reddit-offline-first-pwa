import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { normalize, denormalize } from 'normalizr'

import { actions, types } from '../actions'
import getApi from '../../../api'
import { postsSchema } from '../../../schemas'

function* getPosts() {
  const result = yield call(getApi, '/api/frontend')

  const normalized = normalize(result.data.children, postsSchema)

  console.log(normalized)

  // yield put(actions.getPostsMapSuccess())
  // yield put(actions.getPostsSuccess(normalized.result));
}

export function* watchGetPosts() {
  yield* takeLatest(types.GET_POSTS, getPosts)
}

export default function*() {
  yield [
    fork(watchGetPosts),
  ]
}
