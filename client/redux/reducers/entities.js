

export default (state = {}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 100;
    case 'DECREMENT':
      return state - 20;
    default:
      return state;
  }
}
