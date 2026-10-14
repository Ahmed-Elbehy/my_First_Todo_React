import { v4 as uuidv4 } from "uuid";

export function TaskReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      const newTasks = [
        ...state,
        { id: uuidv4(), title: payload, discription: "", check: false },
      ];
      localStorage.setItem("tasksLocal", JSON.stringify(newTasks));
      return newTasks;
    }
    case "delete": {
      const newTasks = state.filter((t) => {
        if (t.id !== payload.id) {
          return t;
        }
      });

      // setTasks(newTasks);
      localStorage.setItem("tasksLocal", JSON.stringify(newTasks));
      return newTasks;
      // return
    }
    case "update": {
      const newTasks = state.map((t) => {
        if (t.id == payload.id) {
          return {
            ...t,
            title: payload.title,
            discription: payload.discription,
          };
        } else {
          return t;
        }
      });
      //   setTasks(newTasks);
      localStorage.setItem("tasksLocal", JSON.stringify(newTasks));
      return newTasks;
    }
    case "efection": {
      const getTasksfromLocal = JSON.parse(localStorage.getItem("tasksLocal"));
      return getTasksfromLocal ? getTasksfromLocal : state;
    }
    case "check": {
      const newTasks = state.map((t) => {
        if (t.id == payload.task.id) {
          return { ...t, check: !t.check };
        }
        return t;
      });
      localStorage.setItem("tasksLocal", JSON.stringify(newTasks));
      return newTasks;
    }
    default: {
      throw new Error(type);
    }
  }
}
