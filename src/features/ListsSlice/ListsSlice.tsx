import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

const initialListsState: { lists: string[] } = { lists: ["General"] };

export const lists = createSlice({
  name: "lists",
  initialState: initialListsState,
  reducers: {
    addList: (state, action: PayloadAction<string>) => {
      const newList = action.payload.trim();

      // Controllo valore vuoto
      if (!newList) return;

      // Controllo valore già presente
      if (state.lists.includes(newList)) return;

      // Aggiungo  nuovo valore
      state.lists.push(newList);
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((list) => list !== action.payload);
    },
  },
});

export default lists.reducer;
export const { addList, removeList } = lists.actions;
