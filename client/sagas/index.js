import { fork } from 'redux-saga/effects'
import { incrementAsyncSaga } from './counter'
// import { watchGetPosts } from '../routes/frontend/sagas'

export default function* rootSaga() {
  yield [
    fork(incrementAsyncSaga),
    // fork(watchGetPosts),
  ]
}
