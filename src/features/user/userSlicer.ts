import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { USERS } from "./constant";

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
