import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";
// import { taskCompleted, titleChanged } from "./store/actions";
// import { createStore } from "./store/createStore";
// import { taskReducer } from "./store/taskReducer";
// import { compose, pipe } from "lodash/fp";

const store = initiateStore();

const App = (params) => {
  console.log(store.getState());
  // const state = store.getState();
  const [state, setState] = useState(store.getState());
  // store.dispatch({ type: "task/completed", payload: { id: 1 } });

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
      // console.log(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    // store.dispatch({ type: "task/completed", payload: { id: taskId } });
    store.dispatch(actions.taskCompleted(taskId));
    // console.log(store.getState());
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  const detletedItems = (taskId) => {
    store.dispatch(actions.itemDeleted(taskId));
  };

  return (
    <>
      <h1>app</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            {/* <p>{el.description}</p> */}
            <p>{el.title}</p>
            <p>{`Completed:${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Completed</button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button onClick={() => detletedItems(el.id)}>Delete items</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
