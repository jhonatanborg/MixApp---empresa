const mutations = {
  error(state, payload) {
    state.error = payload;
  },
  request(state, payload) {
    const stateObject = payload.state;
    state[stateObject] = payload.data;
  },
  message(state, payload) {
    state.message = payload;
  },
};

export default mutations;
