import { denormalize } from 'normalizr'
import { postsSchema } from '../../../schemas'

export const selectPosts = state => (
  denormalize(state.posts, postsSchema, state.entities)
)
