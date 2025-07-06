import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

import { TaskActions } from "./TaskActions";
import { setStatus } from "@/features/TasksSlice/TasksSlice";

import NTIllustatin from "../../assets/no-taasks-illustration.svg";

import { RxDotsVertical } from "react-icons/rx";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";
import { Badge } from "../shadcn-ui/badge";
import { Checkbox } from "../shadcn-ui/checkbox";

export default function Tasks() {
  let dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const today = new Date().toDateString();

  const todayTasks = tasks.filter(
    (task) => task.dueDate && new Date(task.dueDate).toDateString() === today
  );

  // Funzione per modificare lo stato di una singola task
  function handleCheckTask(id: string) {
    dispatch(setStatus(id));
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start gap-4 w-full">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center rounded-lg border-2 border-primary bg-primary-foreground w-full h-auto pr-3"
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.isDone}
                  className="ml-4"
                  onCheckedChange={
                    () => handleCheckTask(task.id) //Se la checkbox è checked (true) anche isDone sarà true
                  }
                />
                {
                  // Label necessario per aggiungere il testo della task alla checkbox
                }
                <label
                  htmlFor={`task-${task.id}`}
                  className={`break-word max-w-xs text-wrap wrap-break-word px-0 py-2 cursor-pointer ${
                    task.isDone ? " text-primary line-through" : ""
                  }`} // Rimosso padding orizzontale e reso cliccabile per la label
                >
                  {task.label}
                </label>
              </div>
              <div className="flex justify-between items-center gap-1">
                <Badge variant="secondary">{task.category}</Badge>
                <Popover>
                  <PopoverTrigger>
                    <RxDotsVertical />
                  </PopoverTrigger>
                  <PopoverContent className=" w-fit">
                    <TaskActions id={task.id} label={task.label} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
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
