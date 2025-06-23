import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice/UserSlice";
import tasksReducer from "../features/TasksSlice/TasksSlice";

//Funzione di aggiornamento degli stati
function updateState(state: RootState, key: "storedUser" | "storedTasks") {
  //aggiornamento stato user
  if (key === "storedUser") {
    const stringedUserState = JSON.stringify(state.user);
    localStorage.setItem(key, stringedUserState);
  }

  //aggiornamento stato tasks
  else if (key === "storedTasks") {
    const stringedTassksState = JSON.stringify(state.tasks);
    localStorage.setItem(key, stringedTassksState);
  }
}

// Funzione che carica lo stato da local storage
function loadLocalState(key: "storedUser" | "storedTasks") {
  const localState = localStorage.getItem(key);
  // Se lo stato è null restituisco undefined in modo da caricare initial state
  if (!localState) return undefined;
  return JSON.parse(localState!);
}

//Stati caricati da Local storage
const localUserState = loadLocalState("storedUser");
const localTasksState = loadLocalState("storedTasks");

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
  preloadedState: {
    user: localUserState,
    tasks: localTasksState,
  },
});

store.subscribe(() => {
  updateState(store.getState(), "storedUser");
  updateState(store.getState(), "storedTasks");
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
