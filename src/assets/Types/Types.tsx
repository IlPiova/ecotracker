type User = {
  name: string;
  lastName: string;
  motto: string;
};

type Task = {
  id: string;
  label: string;
  category: "H2O" | "CO2" | "Society";
  isDone: boolean;
  dueDate: string | undefined;
};

type Habit = {
  id: number;
  label: string;
  category: "H2O" | "CO2" | "Society";
  isDone: boolean;
  doneDate: Date[];
};

export { type User, type Task, type Habit };
