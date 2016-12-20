export const types = {
  INCREMENT_ASYNC: 'INCREMENT_ASYNC',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

export const actions = {
  incrementAsync(action) {
    return { type: types.INCREMENT_ASYNC, payload: action };
  },
  increment(action) {
    return { type: types.INCREMENT, payload: action };
  },
  decrement(action) {
    return { type: types.DECREMENT, payload: action };
  },
};