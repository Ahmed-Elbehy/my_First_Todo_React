import {
  Button,
  Card,
  FloatingLabel,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState, useEffect, useMemo } from "react";
import SingleTask from "./SingleTask";
import AleartTost from "./AleartTost";
// import { TaskReducer } from "./reducers/taskReducer";
// import {ReducerTasksContext} from "./contextes/reducerTasksContext"
import { useTasks,useDispach } from "./contextes/reducerTasksContext";
export default function TasksBox() {
  //   field state**
  const [field, setField] = useState("");
  // App من  stste بجيب من خلالة الـ  context لـ  declration ده عبارة عن
  // Reducer
  const tasks  = useTasks();
  const  dispatch  = useDispach();
  // const [tasks, dispatch] = useReducer(TaskReducer, []);
  // تحديد نوع كل زرار لاستدعاء المهام المطلوبة سواء (سواء المكتملة او الغير مكتملو أو الكل )
  const [desplayButtonType, setDesplayButtonType] = useState("all");
  //Delete modal state****
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // dialog Task id
  const [dialogTask, setDialogTask] = useState(null);
  // dialog Task
  // open Updet State
  const [openUpdetModal, setOpenUpdetModal] = useState(false);
  // Updet Field State
  const [updetFields, setUpdetFields] = useState({
    title: "",
    discription: "",
  });
  // showTost State
  const [showTost, setShowTost] = useState("");

  function showTostAlert(message) {
    setShowTost(message);
    setTimeout(() => {
      setShowTost("");
    }, 3000);
  }
  // ChangeDesplayType
  function changeDisplatType(event) {
    setDesplayButtonType(event.target.value);
  }
  //Start UseEffect*************/
  useEffect(() => {
    dispatch({ type: "efection" });
  }, []);
  // End UseEffect***********/
  // start useMemo
  const completedTasks = useMemo(() => {
    return tasks.filter((e) => {
      return e.check;
    });
  }, [tasks]);

  const notCompletedTasks = useMemo(() => {
    return tasks.filter((e) => {
      return !e.check;
    });
  }, [tasks]);
  // end useMemo
  // selected tasks Type
  let typeTasks;
  if (desplayButtonType === "all") {
    typeTasks = tasks;
  } else if (desplayButtonType === "completed") {
    typeTasks = completedTasks;
  } else {
    typeTasks = notCompletedTasks;
  }
  // handle open delete model****
  const handleOpenDeleteModal = (task) => {
    setDialogTask(task);
    setOpenDeleteModal(true);
  };
  // handleDeleteConferm****
  function handleDeleteConferm() {
    // const newTasks = tasks.filter((t) => {
    //   if (t.id !== dialogTask.id) {
    //     return t;
    //   }
    // });
    dispatch({ type: "delete", payload: dialogTask });
    // setTasks(newTasks);
    // localStorage.setItem("tasksLocal", JSON.stringify(newTasks));
    showTostAlert("تم الحذف بنجاح");
  }
  const handleOpenUpdeteModal = (task) => {
    setUpdetFields(() => {
      return {
        ...updetFields,
        title: task.title,
        discription: task.discription,
      };
    });
    setDialogTask(task);
    setOpenUpdetModal(true);
  };
  // handleUpdetConferm****
  function handleUpdetConferm() {
    // const newTasks = tasks.map((t) => {
    //   if (t.id == dialogTask.id) {
    //     return {
    //       ...t,
    //       title: updetFields.title,
    //       discription: updetFields.discription,
    //     };
    //   } else {
    //     return t;
    //   }
    // });
    // setTasks(newTasks);
    // localStorage.setItem("tasksLocal", JSON.stringify(newTasks));
    dispatch({
      type: "update",
      payload: {
        id: dialogTask.id,
        title: updetFields.title,
        discription: updetFields.discription,
      },
    });
    setOpenUpdetModal(false);
    showTostAlert("تم التعديل بنجاح");
  }
  // handle Add Clicked****
  function handleAddClicked() {
    dispatch({ type: "add", payload: field });
    // const newTasks = [
    //   ...tasks,
    //   { id: uuidv4(), title: field, discription: "", check: false },
    // ];

    // setTasks(() => {
    //   return newTasks;
    // });
    setField("");
    showTostAlert("تمت الأضافة بنجاح");
  }

  //ده المكان اللي بملي من خلالة الكمبوننت بالبيانات الي هتتعرض داخل كل شريحة ك مهمة
  const taskJsx = typeTasks.map((task) => {
    return (
      <SingleTask
        key={task.id}
        task={task}
        handleOpenDeleteModal={handleOpenDeleteModal}
        handleOpenUpdeteModal={handleOpenUpdeteModal}
        showTostAlert={showTostAlert}
        dispatch={dispatch}
      />
    );
  });
  return (
    <>
      <Card
        className="max-w-sm bg-red-500 my-3 mx-auto overflow-y-auto
"
        style={{ maxHeight: `80vh` }}
      >
        <div>
          <h1>مهامي</h1>
          <hr className="h-px bg-white border-0" />
        </div>
        <div>
          <ButtonGroup
            onClick={(e) => {
              changeDisplatType(e);
            }}
          >
            <Button value={"notCopleted"} color="cyan">
              غير المنجز
            </Button>
            <Button value={"completed"} color="cyan">
              المنجز
            </Button>
            <Button value={"all"} color="cyan">
              الكل
            </Button>
          </ButtonGroup>
        </div>
        {/*Start SingleTask Component from Task Maping** */}
        {taskJsx}
        {/*End SingleTask Component from Task Maping** */}

        <div className="flex gap-3 justify-center">
          {/* Add button**/}
          <Button
            disabled={!field.length}
            color="green"
            className="mt-1.5"
            onClick={handleAddClicked}
          >
            Add
          </Button>
          <FloatingLabel
            value={field}
            onChange={(e) => {
              setField(e.target.value);
            }}
            variant="outlined"
            label="Title"
            color="success"
          />
        </div>
      </Card>
      {/*Start Delete modal ******/}
      <Modal
        show={openDeleteModal}
        size="md"
        onClick={() => setOpenDeleteModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-red-700" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              هل انت متأكد من الحذف
            </h3>
            <h6 className="mb-5 font-normal text-gray-500 dark:text-gray-400">
              لا يمكن التراجع عن الحذف
            </h6>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={() => handleDeleteConferm()}>
                نعم قم بالحذف
              </Button>
              <Button
                color="alternative"
                onClick={() => setOpenDeleteModal(false)}
              >
                تراجع عن الحذف
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/*End Delete modal *****/}
      {/*Start updet modal ******/}
      <Modal
        show={openUpdetModal}
        size="md"
        onClose={() => setOpenUpdetModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <div className=" mb-5">
              {/* Updet Title Field */}
              <FloatingLabel
                variant="filled"
                label="العنوان"
                value={updetFields.title}
                onChange={(e) =>
                  setUpdetFields({ ...updetFields, title: e.target.value })
                }
              />
              {/* Updet discription Field */}
              <FloatingLabel
                variant="filled"
                label="الوصف"
                value={updetFields.discription}
                onChange={(e) =>
                  setUpdetFields({
                    ...updetFields,
                    discription: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={() => handleUpdetConferm()}>
                تحديث
              </Button>
              <Button
                color="alternative"
                onClick={() => setOpenUpdetModal(false)}
              >
                تراجع
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/*End updet modal *****/}
      {showTost !== "" && <AleartTost message={showTost} />}
    </>
  );
}
