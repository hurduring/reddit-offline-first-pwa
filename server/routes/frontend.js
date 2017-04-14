import express from 'express'
import request from 'request-promise-native'

import { asyncWrapper as aw } from '../utils'

const router = express.Router()

router.get('/', aw(async (req, res, next) => {

  const response = await request('https://reddit.com/r/frontend/hot.json')

  res
    .set('content-type', 'application/json')
    .send(response)
}))

router.get('/post/:id', aw(async (req, res, next) => {

  const response = await request(`https://reddit.com/comments/${req.params.id}.json`)
  // const response = await request('https://reddit.com/r/frontend/hot.json')
  res
    .set('content-type', 'application/json')
    .send(response)
}))

export default router
