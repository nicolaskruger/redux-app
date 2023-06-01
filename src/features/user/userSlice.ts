import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { USERS } from "./constant";
import { AppState } from "../../store";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  url: string;
};

const userAdapter = createEntityAdapter<User>({
  selectId: ({ id }) => id,
});

const initialState = () => {
  const initialState = userAdapter.getInitialState();
  return userAdapter.upsertMany(initialState, USERS);
};

export const userSlicer = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {},
});

export const { reducer: userReducer } = userSlicer;

const selectByEmailAndPassword = createSelector(
  [
    (state: AppState) => userAdapter.getSelectors().selectAll(state.user),
    (state: AppState, email: string, password: string) => ({ email, password }),
  ],
  (users, { email, password }) =>
    users.find((user) => user.email === email && user.password === password)
);

export const selectUserByEmailAndPassword =
  (email: string, password: string) => (state: AppState) =>
    selectByEmailAndPassword(state, email, password);