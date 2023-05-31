import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

type Login = {
  id?: string;
};

const initialState: Login = {
  id: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginWithId: (state, id: PayloadAction<string>) => {
      return {
        id: id.payload,
      };
    },
    loginWithUser: (state, user: PayloadAction<User>) => {
      return {
        id: user.payload.id,
      };
    },
  },
});

export const { reducer: loginReducer } = loginSlice;

export const { loginWithId, loginWithUser } = loginSlice.actions;
