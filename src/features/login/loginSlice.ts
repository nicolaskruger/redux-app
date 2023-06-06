import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, userAdapter } from "../user/userSlice";
import { AppState } from "../../store";

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

export const selectLoginUser = (state: AppState) =>
  userAdapter.getSelectors().selectById(state.user, state.login.id as string);
