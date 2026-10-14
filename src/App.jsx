import "./App.css";
import TasksBox from "./TasksBox";
import { ReducerTasksProvider } from "./contextes/reducerTasksContext";
function App() {
  return (
    <>
      <ReducerTasksProvider>
        <div>
          <TasksBox />
        </div>
      </ReducerTasksProvider>
    </>
  );
}

export default App;
