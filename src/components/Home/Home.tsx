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
import { DatePickerDemo } from "../shadcn-ui/date-picker";

export default function Home() {
  // impostazione stato utili ad aggiornare proprietà dueDate delle diverse Tasks
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Data di oggi per visualizzazione data in home
  const today = new Date().toLocaleDateString("it-IT", options);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [formValues, setFormValues] = useState<{
    label: string;
    category: "H2O" | "CO2" | "Society";
  }>({ label: "", category: "CO2" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      addTask({
        label: formValues.label,
        category: formValues.category,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
      })
    );

    setFormValues({ label: "", category: "CO2" });
  }

  // Funzione crea singola task
  function createTask() {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-start justify-center"
      >
        <div>
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
        </div>
        <div className="flex justify-between items-center gap-3 w-full ">
          <div>
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
          </div>

          <div>
            <label htmlFor="date-picker">Date:</label>

            <DatePickerDemo date={dueDate} setDate={setDueDate} />
          </div>
        </div>
        <Button variant={"default"} type="submit">
          Save
        </Button>
      </form>
    );
  }

  //Layout home

  return (
    <>
      <div className="  flex flex-col gap-2 justify-center items-start mb-10 ">
        <h1 className="text-4xl font-black ">
          Ciao <span className="text-primary "> {user.name}</span>!
        </h1>
        <p className="text-sm ">{today}</p>
      </div>
      <div className="flex flex-col items-center justify-start  h-full border-2 w-full ">
        <div className="  flex flex-col items-start justify-start justify-self-center gap-4 w-full">
          <h2 className="text-xl font-bold mb-4">Cosa vuoi fare oggi?</h2>
          <Tasks />
          <Habits />
        </div>
        <div className="absolute bottom-25 right-1/2 translate-x-1/2 ">
          <Popover>
            <PopoverTrigger className="bg-primary text-lg font-bold rounded-full p-4 ">
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
