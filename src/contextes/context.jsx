// // import { Children } from "react";
// import { createContext, useState } from "react";

// export const TasksContext = createContext("");
// const tasksList = [
//   { id: 1, title: "Task1", discription: "discription1", check: false },
//   { id: 2, title: "Task2", discription: "discription2", check: false },
//   { id: 3, title: "Task3", discription: "discription3", check: false },
// ];
// export function TasksContextProvider({ children }) {
//   const [tasks, setTasks] = useState(tasksList);

//   return (<TasksContext.Provider value={{ tasks, setTasks }}>
//     {children}
//   </TasksContext.Provider>)
// }
