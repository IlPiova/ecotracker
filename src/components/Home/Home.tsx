import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

import Navbar from "../navbar/Navbar";

import {
  NewTaskPopover,
  NewTaskPopoverContent,
  NewTaskPopoverTrigger,
} from "../shadcn-ui/newTaskPopOver";

import { RxPlus } from "react-icons/rx";
import TaskCreator from "../Tasks/TaskCreator";
import { Outlet } from "react-router";

export default function Home() {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Data di oggi per visualizzazione data in home
  const today = new Date().toLocaleDateString("it-IT", options);
  const user = useSelector((state: RootState) => state.user.user);

  //Layout home
  return (
    <>
      <div className="app-wrapper">
        <div className="  flex flex-col gap-2 justify-center items-start mb-10 ">
          <h1 className="text-4xl font-black ">
            Ciao <span className="text-primary "> {user.name}</span>!
          </h1>
          <p className="text-sm ">{today}</p>
        </div>
        <div className="flex flex-col items-center justify-start  h-full  w-full ">
          <div className="  flex flex-col items-start justify-start justify-self-center gap-4 w-full">
            <h2 className="text-xl font-bold mb-4">Cosa vuoi fare oggi?</h2>
            <Outlet />
          </div>

          {/* Bottone per aggiungere nuova task */}
          <div className="absolute bottom-25 right-1/2 translate-x-1/2 ">
            <NewTaskPopover>
              <NewTaskPopoverTrigger className="bg-primary text-lg font-bold rounded-full p-4 ">
                <RxPlus className="h-6 w-auto text-secondary" />
              </NewTaskPopoverTrigger>
              <NewTaskPopoverContent className="relative top-[-50%] left-1/2 w-10/12">
                <TaskCreator />
              </NewTaskPopoverContent>
            </NewTaskPopover>
          </div>
          <Navbar />
        </div>
      </div>
    </>
  );
}
