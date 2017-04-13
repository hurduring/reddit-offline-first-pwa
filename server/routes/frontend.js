import express from 'express'
import request from 'request-promise-native'

import { asyncWrapper as aw } from '../utils'

const router = express.Router()

router.get('/', aw(async (req, res, next) => {

  const response = await request('https://reddit.com/comments/652al9.json')
  // const response = await request('https://reddit.com/r/frontend/hot.json')
  res
    .set('content-type', 'application/json')
    .send(response)
}))

export default router
