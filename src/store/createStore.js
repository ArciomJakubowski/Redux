export function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }
  function dispatch(action) {
    // console.log(action);
    // if (action.type === "task/completed") {
    //   const newArray = [...state];
    //   const elementIndex = newArray.findIndex(
    //     (el) => el.id === action.payload.id
    //   );
    //   newArray[elementIndex].completed = true;
    //   state = newArray;
    //   console.log(state);
    // }
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
  }
  return { getState, dispatch, subscribe };
}
