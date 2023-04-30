import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  getTasks,
  loadTasks,
  titleChanged,
  itemDeleted,
  completeTask,
  getTasksLoadingStatus,
  createTask,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
// import { taskCompleted, titleChanged } from "./store/actions";
// import { createStore } from "./store/createStore";
// import { taskReducer } from "./store/taskReducer";
// import { compose, pipe } from "lodash/fp";

const store = configureStore();

const App = (params) => {
  console.log(store.getState());
  // const state = store.getState();
  // const [state, setState] = useState(store.getState());
  // store.dispatch({ type: "task/completed", payload: { id: 1 } });
  const state = useSelector(getTasks());
  // const state = useSelector((state) => state.tasks.entities);
  const isLoading = useSelector(getTasksLoadingStatus());
  // const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.errors.entities[0]);
  const dispatch = useDispatch();
  // console.log("data", data);

  useEffect(() => {
    dispatch(loadTasks());

    // dispatch(createTask());
    // dispatch(getTasks());
    // store.dispatch(getTasks());
    // store.subscribe(() => {
    //   setState(store.getState());
    // });
  }, []);

  // const completeTask = (taskId) => {
  //   // store.dispatch({ type: "task/completed", payload: { id: taskId } });
  //   // store.dispatch(taskCompleted(taskId));
  //   store.dispatch((dispatch, getState) => {
  //     store.dispatch(taskCompleted(taskId));
  //     console.log(dispatch);
  //     console.log(getState);
  //   });
  //   // console.log(store.getState());
  // };

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
    // store.dispatch(titleChanged(taskId));
  };

  const detletedItems = (taskId) => {
    dispatch(itemDeleted(taskId));
    // store.dispatch(itemDeleted(taskId));
  };

  const handleCreateTask = () => {
    dispatch(createTask());
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>app</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            {/* <p>{el.description}</p>/ */}
            {/* <p>{el.id}</p> */}
            <p>{el.title}</p>
            <p>{`Completed:${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              {/* <button onClick={() => store.dispatch(completeTask(el.id))}> */}
              Completed
            </button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button onClick={() => detletedItems(el.id)}>Delete items</button>
            <hr />
          </li>
        ))}
        <button onClick={() => handleCreateTask()}>Добавить задачу</button>
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
