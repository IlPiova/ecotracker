import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import { removeTask, editTaskLabel } from "@/features/TasksSlice/TasksSlice";

import { RxDotsVertical } from "react-icons/rx";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";
import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";
import { useState } from "react";

export default function Tasks() {
  const [newLabel, setNewLabel] = useState("");
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  function handleDeleteTask(id: string) {
    dispatch(removeTask(id));
  }
  function handleEditTask(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNewLabel(value);
    dispatch(editTaskLabel({ id, label: value }));
  }
  function createList(id: string, label: string) {
    return (
      <div className="flex flex-col  justify-center items-stretch gap-4 w-fit">
        <Popover>
          <PopoverTrigger>
            <Button variant={"ghost"}>Edit task</Button>{" "}
          </PopoverTrigger>
          <PopoverContent className=" w-fit">
            <Input
              type="text"
              name="name"
              id="name"
              alt="Insert user's name"
              placeholder="Insert user's name"
              value={newLabel}
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

  return (
    <>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-start items-start rounded-lg border-2 border-primary bg-primary-foreground w-full h-auto p-4"
          >
            <h2 className="font-bold">{task.label}</h2>
            <Popover>
              <PopoverTrigger>
                <RxDotsVertical />
              </PopoverTrigger>
              <PopoverContent className=" w-fit">
                {createList(task.id, task.label)}
              </PopoverContent>
            </Popover>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
