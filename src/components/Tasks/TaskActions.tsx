import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";

import { useDispatch } from "react-redux";
import { removeTask, editTaskLabel } from "@/features/TasksSlice/TasksSlice";

export function TaskActions({ id, label }: { id: string; label: string }) {
  const dispatch = useDispatch();

  // Funzione per eliminare una singola task
  function handleDeleteTask(id: string) {
    dispatch(removeTask(id));
  }

  // Funzione per modificare una singola task
  function handleEditTask(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    dispatch(editTaskLabel({ id, label: value }));
  }

  // Funzione che crea la lista con le task della giornata

  return (
    <div className="flex flex-col justify-center items-stretch gap-4 w-fit">
      <Popover>
        <PopoverTrigger>
          <Button variant={"ghost"}>Edit task</Button>
        </PopoverTrigger>
        <PopoverContent className=" w-fit">
          <Input
            type="text"
            name="name"
            id="name"
            alt="Insert your task"
            placeholder="Insert your task"
            value={label}
            onChange={(e) => handleEditTask(id, e)}
          />
        </PopoverContent>
      </Popover>

      <Button variant={"ghost"} onClick={() => handleDeleteTask(id)}>
        Delete task
      </Button>
    </div>
  );
}
