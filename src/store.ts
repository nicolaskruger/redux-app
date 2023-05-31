import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { userReducer } from "./features/user/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { loginReducer } from "./features/login/loginSlice";

export function makeStore() {
  return configureStore({
    reducer: { user: userReducer, login: loginReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
