import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { type List } from "@/assets/Types/Types";

const initialListsState: { lists: List[] } = {
  lists: [{ id: "0", name: "General", colour: "green" }],
};

export const lists = createSlice({
  name: "lists",
  initialState: initialListsState,
  reducers: {
    addList: (
      state,
      action: PayloadAction<{
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
      }>
    ) => {
      const newList = action.payload;

      // Controllo lista vuoto
      if (!newList) return;

      // Controllo lista già presente
      if (state.lists.some((list) => list.name === newList.name)) return;

      // Aggiungo  nuovo valore
      state.lists.push({
        id: crypto.randomUUID(),
        name: newList.name,
        colour: newList.colour,
      });
    },
    removeList: (state, action: PayloadAction<List>) => {
      state.lists = state.lists.filter(
        (list) => list.name !== action.payload.name
      );
    },
  },
});

export default lists.reducer;
export const { addList, removeList } = lists.actions;
