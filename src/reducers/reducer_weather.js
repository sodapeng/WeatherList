import { FETCH_WEATHER }from '../actions/index';

export default function(state=[], action) {
  // Here, although in the actions, we pass a promise to reducer, we receive a request result instead
  // This is because we use redux-promise as middleware that act as door keeper. It stops the promise
  // And after it get response result(promise is resolved), it pass the result to reducer.
  // It un-wrap the promise for us.
  switch (action.type) {
    // Always return a new instance of state, instead of mutate the current state.
    case FETCH_WEATHER:
      // Concat did not mutate the original array, it return a new array.
      //return state.concat([action.payload.data]);

      return [ action.payload.data, ...state ];
  }

  return state;
}