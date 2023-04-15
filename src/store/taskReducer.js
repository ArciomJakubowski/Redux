import { taskDeleted, taskUpdated } from "./actionTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    // case "task/completed":
    //   const newArray = [...state];
    //   const elementIndex = newArray.findIndex(
    //     (el) => el.id === action.payload.id
    //   );
    //   newArray[elementIndex].completed = true;
    //   return newArray;
    case taskUpdated: {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }

    case taskDeleted:
      // const newArray = state.filter((el) => el.id !== action.payload.id);
      return state.filter((el) => el.id !== action.payload.id);

    default:
      return state;
  }
}