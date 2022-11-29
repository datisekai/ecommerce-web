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
    setContacts: (state, action) => {
      state.user.contacts = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        date: action.payload.date,
        email: action.payload.email,
        gender: action.payload.gender,
        id: action.payload.id,
        image: action.payload.image,
        isActive: action.payload.isActive,
        name: action.payload.name,
        nameShop: action.payload.nameShop,
        phone: action.payload.phone,
      };
    },
  },
});

export const { setUser, setToken, logOut, setContacts, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
