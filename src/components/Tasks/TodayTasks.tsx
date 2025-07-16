import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn-ui/select";
import { DefaultFilter, ListFilter } from "./TasksFilter";

export default function TodayTasks() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const today = new Date().toDateString();
  const [filter, setFilter] = useState<string>("default");

  const todayTasks = tasks.filter(
    (task) => task.dueDate && new Date(task.dueDate).toDateString() === today
  );

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
          <DefaultFilter arr={todayTasks} />
        ) : filter === "lists" ? (
          <ListFilter arr={todayTasks} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
