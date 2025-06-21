import { useDispatch, useSelector } from "react-redux";
// import { type RootState } from "@/store/Store";
import { useState, type FormEvent } from "react";

import {
  addTask,
  // removeTask,
  // editTaskLabel,
} from "@/features/TasksSlice/TasksSlice";
import Navbar from "../navbar/Navbar";
import Tasks from "../Tasks/Tasks";
import Habits from "../Habits/Habits";

import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { Input } from "../shadcn-ui/input";
import { Button } from "../shadcn-ui/button";

export default function Home() {
  // const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<{
    label: string;
    category: "H2O" | "CO2" | "Society";
  }>({ label: "", category: "CO2" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      addTask({ label: formValues.label, category: formValues.category })
    );

    setFormValues({ label: "", category: "CO2" });
  }

  function createTask() {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="label">What did you do today?</label>
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

        <label htmlFor="category">Category:</label>
        <Select
          value={formValues.category}
          onValueChange={(value) =>
            setFormValues({
              ...formValues,
              category: value as "H2O" | "CO2" | "Society",
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CO2">CO2</SelectItem>
            <SelectItem value="Society">Society</SelectItem>
            <SelectItem value="H2O">H2O</SelectItem>
          </SelectContent>
        </Select>

        <Button variant={"default"} type="submit">
          Save
        </Button>
      </form>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-around gap-4 w-full h-full border-4 border-amber-400">
        <Tasks />
        <Habits />
        <Popover>
          <PopoverTrigger>+</PopoverTrigger>
          <PopoverContent>{createTask()}</PopoverContent>
        </Popover>
        <Navbar />
      </div>
    </>
  );
}
