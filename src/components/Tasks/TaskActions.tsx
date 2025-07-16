import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { DatePickerDemo } from "../shadcn-ui/date-picker";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, editTask } from "@/features/TasksSlice/TasksSlice";
import type { RootState } from "@/store/Store";
import type { List } from "@/assets/Types/Types";

export function TaskActions({
  id,
  label,
  list,
  dueDate,
}: {
  id: string;
  label: string;
  list: List;
  dueDate: string;
}) {
  const [newTask, setNewTask] = useState({
    id: id,
    label: label,
    list: list,
    dueDate: dueDate,
  });
  const [newDueDate, setNewDueDate] = useState<Date | undefined>(
    new Date(newTask.dueDate)
  );

  const lists = useSelector((state: RootState) => state.lists.lists);
  const dispatch = useDispatch();

  // Funzione per eliminare una singola task
  function handleDeleteTask(id: string) {
    dispatch(removeTask(id));
  }

  // Funzione per modificare una singola task
  function handleEditTask() {
    dispatch(
      editTask({
        id,
        label: newTask.label,
        list: newTask.list,
        dueDate: newTask.dueDate,
      })
    );
  }

  //Funzione che restituisce una lista dato il suo nome
  function listSelector(name: string) {
    const selectedList = lists.filter((list) => list.name === name);
    return selectedList[0];
  }

  // Funzione che crea la lista con le task della giornata

  return (
    <div className="flex flex-col justify-center items-stretch gap-4 w-fit">
      <Popover>
        <PopoverTrigger>
          <div>Edit task</div>
        </PopoverTrigger>
        <PopoverContent className=" w-max">
          <form className="flex flex-col gap-3 items-start justify-center">
            <div>
              <label htmlFor="label">Edit your task label:</label>
              <Input
                type="text"
                name="name"
                id="name"
                alt="Insert your task"
                placeholder="Insert your task"
                value={newTask.label}
                onChange={(e) =>
                  setNewTask({ ...newTask, label: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between items-center gap-3 w-full ">
              <div>
                <label htmlFor="list">List:</label>
                <Select
                  value={newTask.list.name}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, list: listSelector(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="list" />
                  </SelectTrigger>
                  <SelectContent>
                    {lists.map((list, i) => (
                      <SelectItem value={list.name} key={i}>
                        {list.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col align-center justify-start">
                <label htmlFor="date-picker">Date:</label>

                <DatePickerDemo date={newDueDate} setDate={setNewDueDate} />
              </div>
            </div>
            <Button variant={"default"} onClick={() => handleEditTask()}>
              Submit
            </Button>
          </form>
        </PopoverContent>
      </Popover>

      <div onClick={() => handleDeleteTask(id)}>Delete task</div>
    </div>
  );
}
