import { fork } from 'redux-saga/effects'

import { watchGetPosts } from '../../pages/posts/sagas'

export default function* rootSaga() {
  yield [
    fork(watchGetPosts)
  ]
}
