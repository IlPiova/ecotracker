import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

import NTIllustatin from "../../assets/no-taasks-illustration.svg";
import TaskComponent from "./TaskComponent";
import Navbar from "../navbar/Navbar";

export default function AllTasksComponent() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 w-full">
        {tasks.length > 0 ? (
          tasks.map((task) => (
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
        <Navbar />
      </div>
    </>
  );
}
