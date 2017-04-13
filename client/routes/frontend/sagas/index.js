import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { normalize, denormalize } from 'normalizr'

import { actions, types } from '../actions'
import getApi from '../../../api'
import postsSchema from '../../../schemas'

const get = (obj, string, def = null) => {

  const res = string.split('.').reduce((a, c) => {
    if (a[c] && a !== 'not found') {
      return a[c]
    } else {
      return 'not found'
    }
  }, obj)

  return res === 'not found' ? def : res
}

const find = (obj) => {
  if (get(obj, 'data.id') == 'dg7hbde') {
    console.log(obj)
    return
  }
  get(obj, 'data.replies.data.children', []).forEach(o => {
    find(o)
  })
}

function* getPosts() {
  const result = yield call(getApi, '/api/frontend')



  const normalized = normalize(result[1].data.children, postsSchema)
  // const normalized = normalize(result.data.children, postsSchema)

  // console.log(normalized)

  console.log(denormalize(normalized.result, postsSchema, normalized.entities))

  // console.log(normalized)
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
