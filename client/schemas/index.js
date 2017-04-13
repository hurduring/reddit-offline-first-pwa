import { schema } from 'normalizr'

// const post = new schema.Entity('postInfo', {}, {
//   idAttribute: value => value.data.id,
//   processStrategy: value => ({ ...value.data }),
// })
//
// const posts = new schema.Array(post)


// const comment = new schema.Entity('comment', {}, {
//   idAttribute: value => value.data.id,
//   processStrategy: value => ({ ...value.data }),
// })

const reply = new schema.Entity('reply', {}, {
  idAttribute: value => value.id || value.data.id,
  processStrategy: value => ({ ...value.data }),
})

reply.define({
  replies: {
    data: {
      children: new schema.Array(reply),
    },
  },
})

// const comment = new schema.Object({ data: { children: replies }})

const comments = new schema.Array(reply)

export default comments
