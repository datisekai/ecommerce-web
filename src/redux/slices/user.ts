import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  user: any;
  token: string | null;
}

const initialState: userState = {
  user: undefined,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.user = undefined;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logOut } = userSlice.actions;

export default userSlice.reducer;
