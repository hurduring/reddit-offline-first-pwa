import { schema } from 'normalizr'

import { get } from '../utils'

const post = new schema.Entity('post', {}, {
  idAttribute: value => value.id || value.data.id,
  processStrategy: value => ({
    ...value.data,
    replies: [...get(value, 'data.replies.data.children', [])],
  }),
})

post.define({
  replies: new schema.Array(post),
})

export default new schema.Array(post)
