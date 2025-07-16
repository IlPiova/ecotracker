import { addTask } from "@/features/TasksSlice/TasksSlice";
import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/Store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { Input } from "../shadcn-ui/input";
import { Button } from "../shadcn-ui/button";
import { DatePickerDemo } from "../shadcn-ui/date-picker";

export default function TaskCreator() {
  const lists = useSelector((state: RootState) => state.lists.lists);
  // impostazione stato utili ad aggiornare proprietà dueDate delle diverse Tasks
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<{
    label: string;
    list: string;
  }>({ label: "", list: "General" });

  function listSelector(name: string) {
    const selectedList = lists.filter((list) => list.name === name);
    return selectedList[0];
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      addTask({
        label: formValues.label,
        list: listSelector(formValues.list),
        dueDate: dueDate.toISOString(),
      })
    );

    setFormValues({ label: "", list: "General" });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 items-start justify-center"
    >
      <div>
        <label htmlFor="label">What do you must do today?</label>
        <Input
          type="text"
          name="label"
          id="label"
          alt="Insert new task"
          placeholder="Insert new task"
          value={formValues.label}
          onChange={(e) =>
            setFormValues({ ...formValues, label: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between items-center gap-3 w-full ">
        <div>
          <label htmlFor="list">List:</label>
          <Select
            value={formValues.list}
            onValueChange={(value) =>
              setFormValues({ ...formValues, list: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="list" />
            </SelectTrigger>
            <SelectContent>
              {lists.map((list) => (
                <SelectItem value={list.name} key={list.id}>
                  {list.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="date-picker">Date:</label>

          <DatePickerDemo
            date={dueDate}
            setDate={(date) => (date ? setDueDate(date) : "")}
          />
        </div>
      </div>
      <Button variant={"default"} type="submit">
        Save
      </Button>
    </form>
  );
}
