import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

// const initialState = [
//   { id: 1, title: "Task 1", completed: false },
//   { id: 2, title: "Task 2", completed: false },
// ];

const initialState = { entities: [], isLoading: true };
console.log("1", initialState.entities);

// const update = createAction("task/updated");
// const remove = createAction("task/deleted");

// const TASK_UPDATED = "task/updated";
// const TASK_DELETED = "task/deleted";

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      // return action.payload;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
      // return state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskRequested(state, action) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      // state.error = action.payload;
      state.isLoading = false;
    },
    taskCreated(state, action) {
      state.entities.push(action.payload);
    },
  },
});

// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//       state[elementIndex] = { ...state[elementIndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((el) => el.id !== action.payload.id);
//     });
// });

// function taskReducer(state = [], action) {
//   switch (action.type) {
//     // case "task/completed":
//     //   const newArray = [...state];
//     //   const elementIndex = newArray.findIndex(
//     //     (el) => el.id === action.payload.id
//     //   );
//     //   newArray[elementIndex].completed = true;
//     //   return newArray;
//     case update.type: {
//       const newArray = [...state];
//       const elementIndex = newArray.findIndex(
//         (el) => el.id === action.payload.id
//       );
//       newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
//       return newArray;
//     }

//     case remove.type:
//       // const newArray = state.filter((el) => el.id !== action.payload.id);
//       return state.filter((el) => el.id !== action.payload.id);

//     default:
//       return state;
//   }
// }
const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  recived,
  taskRequested,
  taskRequestFailed,
  taskCreated,
} = actions;

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestFailed");

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
    console.log("loadData", data);
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

// export function taskCompleted(id) {
//   return update({ id, completed: true });
//   //   return {
//   //     type: TASK_UPDATED,
//   //     payload: { id, completed: true },
//   //   };
// }

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
  //   return {
  //     type: TASK_UPDATED,
  //     payload: { id, title: `New title for ${id}` },
  //   };
}

export function itemDeleted(id) {
  return remove({ id });
  //   return {
  //     type: TASK_DELETED,
  //     payload: { id },
  //   };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const createTask = () => async (dispatch) => {
  try {
    const data = await todosService.create();
    console.log("createData", data);
    dispatch(taskCreated({ ...data, id: getRandomInt(4, 10) }));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
