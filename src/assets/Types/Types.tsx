type User = {
  name: string;
  lastName: string;
  motto: string;
};

type Task = {
  id: string;
  label: string;
  list: string;
  isDone: boolean;
  dueDate: string | undefined;
};

export { type User, type Task };
