import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { normalize, denormalize } from 'normalizr'

import { actions as postsActions, types as postsTypes } from '../actions'
import { actions as entitiesActions } from '../../../redux/actions/entities'

import getApi from '../../../api'
import { postsSchema } from '../../../schemas'

function* getPosts(action) {
  const result = yield call(getApi, `/api/subreddit/${action.payload.subreddit}`)

  const normalized = normalize(result.data.children, postsSchema)

  yield put(entitiesActions.setPostsEntity(normalized.entities.post))
  yield put(postsActions.getPostsSuccess(normalized.result));
}

export function* watchGetPosts() {
  yield* takeLatest(postsTypes.GET_POSTS, getPosts)
}

export default function* () {
  yield [
    fork(watchGetPosts),
  ]
}
