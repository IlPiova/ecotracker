import { type Task } from "@/assets/Types/Types";
import NoTasks from "./NoTasks";
import TaskComponent from "./TaskComponent";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../shadcn-ui/collapsible";
import { Badge } from "../shadcn-ui/badge";

function DefaultFilter({ arr }: { arr: Task[] }) {
  return arr.length > 0 ? (
    arr.map((task) => (
      <TaskComponent
        key={task.id}
        id={task.id}
        label={task.label}
        isDone={task.isDone}
        list={task.list}
        dueDate={task.dueDate}
      />
    ))
  ) : (
    <NoTasks />
  );
}

function ListFilter({ arr }: { arr: Task[] }) {
  const lists = useSelector((state: RootState) => state.lists.lists);
  return (
    <>
      {arr.length > 0 ? (
        lists.map((list) => {
          const tasksInList = arr.filter((task) => task.list.id === list.id);

          if (tasksInList.length === 0) {
            return null;
          }

          return (
            <Collapsible key={list.id} className="w-full">
              <CollapsibleTrigger>
                <Badge
                  variant={list.colour}
                  className="text-md font-medium px-2 py-1"
                >
                  {list.name}
                </Badge>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {tasksInList.map((task) => (
                  <TaskComponent
                    key={task.id}
                    id={task.id}
                    label={task.label}
                    isDone={task.isDone}
                    list={task.list}
                    dueDate={task.dueDate}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })
      ) : (
        <NoTasks />
      )}
    </>
  );
}

export { DefaultFilter, ListFilter };
