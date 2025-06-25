import type { User } from "@/assets/Types/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialUserState: { user: User } = {
  user: { name: "", lastName: "", motto: "" },
};

export const user = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    editUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default user.reducer;
export const { editUser } = user.actions;
