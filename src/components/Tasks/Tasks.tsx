import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

import NTIllustatin from "../../assets/no-taasks-illustration.svg";
import TaskComponent from "./TaskComponent";

export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const today = new Date().toDateString();

  const todayTasks = tasks.filter(
    (task) => task.dueDate && new Date(task.dueDate).toDateString() === today
  );

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 w-full">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <TaskComponent
              key={task.id}
              id={task.id}
              label={task.label}
              isDone={task.isDone}
              list={task.list}
              dueDate={task.dueDate}
            />
          ))
        ) : (
          <div className="flex flex-col gap-4 justify-around items-start">
            <p className="text-gray-500 ">Nessuna task per oggi!</p>
            <img
              src={NTIllustatin}
              alt="Illustrazione Nessuna task"
              className="w-[60%] h-auto max-w-sm mt-6"
            />
          </div>
        )}
      </div>
    </>
  );
}
