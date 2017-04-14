import { schema } from 'normalizr'

const post = new schema.Entity('post', {}, {
  idAttribute: value => value.id || value.data.id,
  processStrategy: value => ({ ...value.data }),
})

export default new schema.Array(post)
