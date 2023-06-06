import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
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

export const userAdapter = createEntityAdapter<User>({
  selectId: ({ id }) => id,
});

const initialState = () => {
  const initialState = userAdapter.getInitialState();
  return userAdapter.upsertMany(initialState, USERS);
};

export const userSlicer = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    addUser: (
      state,
      user: PayloadAction<Pick<User, "email" | "name" | "password" | "url">>
    ) => {
      const newUser: User = {
        ...user.payload,
        id: nanoid(),
      };

      userAdapter.addOne(state, newUser);
    },
  },
});

export const { addUser } = userSlicer.actions;

export const { reducer: userReducer } = userSlicer;

const selectByEmailAndPassword = createSelector(
  [
    (state: AppState) => userAdapter.getSelectors().selectAll(state.user),
    (state: AppState, email: string, password: string) => ({ email, password }),
  ],
  (users, { email, password }) =>
    users.find((user) => user.email === email && user.password === password)
);

export const selectUserByEmail = (email: string) => (state: AppState) =>
  userAdapter
    .getSelectors()
    .selectAll(state.user)
    .find((user) => user.email === email);

export const selectUserByEmailAndPassword =
  (email: string, password: string) => (state: AppState) =>
    selectByEmailAndPassword(state, email, password);
