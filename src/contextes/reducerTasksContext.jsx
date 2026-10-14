import { TaskReducer } from "../reducers/taskReducer";
import { createContext, useReducer, useContext } from "react";

const ReducerTasksContext = createContext([]);
const DispatchContext = createContext(null);

export function ReducerTasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(TaskReducer, []);
  return (
      <ReducerTasksContext.Provider value={tasks}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </ReducerTasksContext.Provider>
    
  );
}; 

export function useTasks() {
  const context = useContext(ReducerTasksContext);
  if (context === null) {
    throw new Error(
      "useTasks لازم يتستخدم جوه ReducerTasksProvider ,from UseTasks",
    );
  };

  return context;
}
export function useDispach() {
  const context = useContext(DispatchContext);
  if (context === null) {
    throw new Error("useTasks لازم يتستخدم جوه , from UseDispatch");
  };

  return context;
}