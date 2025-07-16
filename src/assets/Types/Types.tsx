type User = {
  name: string;
  lastName: string;
  motto: string;
};

type Task = {
  id: string;
  label: string;
  list: List;
  isDone: boolean;
  dueDate: string;
};

type List = {
  id: string;
  name: string;
  colour:
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink";
};

export { type User, type Task, type List };
