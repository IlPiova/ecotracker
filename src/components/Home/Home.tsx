import { useDispatch, useSelector } from "react-redux";
import { useState, type FormEvent } from "react";
import type { RootState } from "@/store/Store";

import { addTask } from "@/features/TasksSlice/TasksSlice";
import Navbar from "../navbar/Navbar";
import Tasks from "../Tasks/Tasks";

import {
  NewTaskPopover,
  NewTaskPopoverContent,
  NewTaskPopoverTrigger,
} from "../shadcn-ui/newTaskPopOver";
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
  const lists = useSelector((state: RootState) => state.lists.lists);

  const [formValues, setFormValues] = useState<{
    label: string;
    list: string;
  }>({ label: "", list: "General" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      addTask({
        label: formValues.label,
        list: formValues.list,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
      })
    );

    setFormValues({ label: "", list: "General" });
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
            <label htmlFor="list">List:</label>
            <Select
              value={formValues.list}
              onValueChange={(value) =>
                setFormValues({ ...formValues, list: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="List" />
              </SelectTrigger>
              <SelectContent>
                {lists.map((list, i) => (
                  <SelectItem value={list} key={i}>
                    {list}
                  </SelectItem>
                ))}
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
      <div className="flex flex-col items-center justify-start  h-full  w-full ">
        <div className="  flex flex-col items-start justify-start justify-self-center gap-4 w-full">
          <h2 className="text-xl font-bold mb-4">Cosa vuoi fare oggi?</h2>
          <Tasks />
        </div>

        {/* Bottone per aggiungere nuova task */}
        <div className="absolute bottom-25 right-1/2 translate-x-1/2 ">
          <NewTaskPopover>
            <NewTaskPopoverTrigger className="bg-primary text-lg font-bold rounded-full p-4 ">
              <RxPlus className="h-6 w-auto text-secondary" />
            </NewTaskPopoverTrigger>
            <NewTaskPopoverContent className="relative top-[-50%] left-1/2 w-10/12">
              {createTask()}
            </NewTaskPopoverContent>
          </NewTaskPopover>
        </div>
        <Navbar />
      </div>
    </>
  );
}
