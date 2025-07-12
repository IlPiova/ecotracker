import { useDispatch } from "react-redux";

import { RxDotsVertical } from "react-icons/rx";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";
import { Badge } from "../shadcn-ui/badge";
import { Checkbox } from "../shadcn-ui/checkbox";

import { TaskActions } from "./TaskActions";
import { setStatus } from "@/features/TasksSlice/TasksSlice";
import type { Task } from "@/assets/Types/Types";

export default function TaskComponent({
  id,
  isDone,
  label,
  list,
  dueDate,
}: Task) {
  let dispatch = useDispatch();

  // Funzione per modificare lo stato di una singola task
  function handleCheckTask(id: string) {
    dispatch(setStatus(id));
  }
  return (
    <div
      key={id}
      className="flex justify-between items-center rounded-lg border-2 border-primary bg-primary-foreground w-full h-auto pr-3"
    >
      <div className="flex items-center gap-4">
        <Checkbox
          id={`task-${id}`}
          checked={isDone}
          className="ml-4"
          onCheckedChange={() => handleCheckTask(id)}
        />
        {
          // Label necessario per aggiungere il testo della task alla checkbox
        }
        <label
          htmlFor={`task-${id}`}
          className={`break-word max-w-xs text-wrap wrap-break-word px-0 py-2 cursor-pointer ${
            isDone ? " text-primary line-through" : ""
          }`}
        >
          {label}
        </label>
      </div>
      <div className="flex justify-between items-center gap-1">
        <Badge variant="secondary">{list}</Badge>
        <Popover>
          <PopoverTrigger>
            <RxDotsVertical />
          </PopoverTrigger>
          <PopoverContent className=" w-fit">
            <TaskActions id={id} label={label} list={list} dueDate={dueDate} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
