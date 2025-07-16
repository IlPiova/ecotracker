import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import { useState } from "react";
import Navbar from "../navbar/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { DefaultFilter, ListFilter } from "./TasksFilter";

export default function AllTasksComponent() {
  const [filter, setFilter] = useState<string>("default");

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <>
      <Select value={filter} onValueChange={(value) => setFilter(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default </SelectItem>
          <SelectItem value="lists">Lists </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex flex-col justify-start items-start gap-4 w-full">
        {filter === "default" ? (
          <DefaultFilter arr={tasks} />
        ) : filter === "lists" ? (
          <ListFilter arr={tasks} />
        ) : (
          <></>
        )}
        <Navbar />
      </div>
    </>
  );
}
