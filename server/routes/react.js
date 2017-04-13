import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res
    .set('content-type', 'application/json')
    .send({
      name: 'reactjs',
    })
})

export default router
