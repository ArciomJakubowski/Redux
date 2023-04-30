export function logger(state) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      // console.log('dispatching', action)
      //   console.log(next);
      //   console.log(action);
      //   if (action.type === "task/update") {
      //     return dispatch({
      //       type: "task/remove",
      //       payload: { ...action.payload },
      //     });
      //   }
      // let result = next(action)
      // console.log('next state', store.getState())
      // return result
      return next(action);
    };
  };
}
