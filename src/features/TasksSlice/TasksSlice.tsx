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
        category: "H2O" | "CO2" | "Society";
        dueDate: string | undefined;
      }>
    ) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        label: action.payload.label,
        category: action.payload.category,
        dueDate: action.payload.dueDate,
        isDone: false,
      });
    },
    removeTask: (state, isAction: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== isAction.payload);
    },
    editTaskLabel: (
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) task.label = action.payload.label;
      });
    },
  },
});

export default tasks.reducer;
export const { addTask, removeTask, editTaskLabel } = tasks.actions;
