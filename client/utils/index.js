export const get = (obj, string, def = null) => {

  const res = string.split('.').reduce((a, c) => {
    if (a[c] && a !== 'not found') {
      return a[c]
    } else {
      return 'not found'
    }
  }, obj)

  return res === 'not found' ? def : res
}

export const find = (obj) => {
  if (get(obj, 'data.id') == 'dg7hbde') {
    console.log(obj)
    return
  }
  get(obj, 'data.replies.data.children', []).forEach(o => {
    find(o)
  })
}
