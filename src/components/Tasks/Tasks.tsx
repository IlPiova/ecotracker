import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import { TaskActions } from "./TaskActions";

import NTIllustatin from "../../assets/no-taasks-illustration.svg";

import { RxDotsVertical } from "react-icons/rx";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";
import { Badge } from "../shadcn-ui/badge";

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
            <div
              key={task.id}
              className="flex justify-between items-center rounded-lg border-2 border-primary bg-primary-foreground w-full h-auto p-4 "
            >
              <p className="break-word max-w-xs text-wrap wrap-break-word">
                {task.label}
              </p>
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
