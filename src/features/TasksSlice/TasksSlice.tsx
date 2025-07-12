import { type Task } from "@/assets/Types/Types";
import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

const initialTasksState: { tasks: Task[] } = { tasks: [] };

export const tasks = createSlice({
  name: "tasks",
  initialState: initialTasksState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        label: string;
        list: string;
        dueDate: string;
      }>
    ) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        label: action.payload.label,
        list: action.payload.list,
        dueDate: action.payload.dueDate,
        isDone: false,
      });
    },
    removeTask: (state, isAction: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== isAction.payload);
    },
    editTask: (
      state,
      action: PayloadAction<{
        id: string;
        label: string;
        dueDate: string;
        list: string;
      }>
    ) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.label = action.payload.label;
          task.list = action.payload.list;
          task.dueDate = action.payload.dueDate;
        }
      });
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload) task.isDone = !task.isDone;
      });
    },
  },
});

export default tasks.reducer;
export const { addTask, removeTask, editTask, setStatus } = tasks.actions;
