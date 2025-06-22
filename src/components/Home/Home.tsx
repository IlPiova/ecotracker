import { useDispatch, useSelector } from "react-redux";
import { useState, type FormEvent } from "react";

import { addTask } from "@/features/TasksSlice/TasksSlice";
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
import { RxPlus } from "react-icons/rx";
import type { RootState } from "@/store/Store";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

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

  // Funzione crea singola task
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

  //Layout home

  return (
    <>
      <h1 className="text-4xl font-black mb-10 m-4">
        Ciao <span className="text-primary "> {user.name}</span>!
      </h1>
      <div className="flex flex-col items-center justify-start  w-fit h-full m-4 ">
        <div className=" flex flex-col items-start justify-centergap-4 w-fit">
          <h2 className="text-xl font-bold mb-4">Cosa vuoi fare oggi?</h2>
          <Tasks />
          <Habits />
        </div>
        <div className="absolute bottom-15 right-6 ">
          <Popover>
            <PopoverTrigger className=" bg-primary text-lg font-bold rounded-full p-4 ">
              <RxPlus className="h-6 w-auto text-secondary" />
            </PopoverTrigger>
            <PopoverContent>{createTask()}</PopoverContent>
          </Popover>
        </div>
        <Navbar />
      </div>
    </>
  );
}
