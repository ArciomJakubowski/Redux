// import {
//   applyMiddleware,
//   legacy_createStore as createStore,
//   compose,
// } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./errors";
import { logger } from "./middleware/logger";
// import { thunk } from "./middleware/thunk";
import taskReducer from "./task";

// const store = createStore(taskReducer, initialState);

// const middlewareEnhancer = applyMiddleware(logger, thunk);

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

// taskReducer,
// compose(
//   middlewareEnhancer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()
// )
// function configureStore() {
//   return createStore(
//     taskReducer,
//     compose(
//       middlewareEnhancer,
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// }

export default createStore;
