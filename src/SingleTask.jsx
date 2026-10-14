import { Button } from "flowbite-react";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import{useDispach} from "./contextes/reducerTasksContext"
export default function SingleTask({
  task,
  handleOpenDeleteModal,
  handleOpenUpdeteModal,
  showTostAlert,
}) {
    const dispatch = useDispach()

  //   handel checked******
  function handleChecked() {
    dispatch({ type: "check", payload: { task: task } });
    task.check
      ?  showTostAlert("تمت الاضافة لغير المنجز ")
      :showTostAlert("تمت الاضافة للمنجز ");
      
  }
  return (
    <>
      {/*Start show Task  */}
      <div className="bg-blue-500 text-white flex rounded-xl px-5 py-1.5 justify-between transform hover:scale-110 duration-300 ease-in-out">
        <div className="flex gap-1 items-center">
          {/* Delete Button *****/}
          <Button
            onClick={() => handleOpenDeleteModal(task)}
            className="rounded-full  border-2 border-red-500 via-red-500  focus:ring-0  p-2"
            style={{ backgroundColor: `white` }}
          >
            <MdDeleteOutline className="text-red-500 text-xl " />
          </Button>
          {/* Edit Button *****/}
          <Button
            onClick={() => handleOpenUpdeteModal(task, task.title)}
            className="rounded-full  border-2 border-sky-500  via-blue-600  focus:ring-0 p-2"
            style={{ backgroundColor: `white` }}
          >
            <MdEdit className="text-blue-500  text-xl " />
          </Button>
          {/* Check Button ********/}
          <Button
            className="rounded-full  border-2 border-green-500 via-green-500 focus:ring-0 p-2"
            style={
              !task.check
                ? { backgroundColor: `white` }
                : { backgroundColor: `green` }
            }
            onClick={() => handleChecked(task.id)}
          >
            <FaCheck
              className={
                !task.check ? "text-green-900 text-xl " : "text-white text-xl "
              }
            />
          </Button>
        </div>
        <div className="w-40 ">
          <p
            className={
              task.check ? "wrap-break-word line-through" : "wrap-break-word"
            }
          >
            {task.title}
          </p>
          <hr className="bg-pink-500" />
          <p className="wrap-break-word">{task.discription}</p>
        </div>
      </div>
      {/*End show Task  */}
    </>
  );
}
