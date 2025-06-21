import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice/UserSlice";
import tasksReducer from "../features/TasksSlice/TasksSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
